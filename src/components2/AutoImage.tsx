import {  COLOR_EVENT_ERROR } from "@themes/index";
import React, { useLayoutEffect, useState } from "react"
import { Image, ImageProps, ImageURISource, Platform, View } from "react-native"
import { Icon } from '@components';

export interface AutoImageProps extends ImageProps {
  maxWidth?: number
  maxHeight?: number
}

export function useAutoImage(
  remoteUri: string,
  dimensions?: [maxWidth: number, maxHeight: number],
): [width: number, height: number] {
  const [[remoteWidth, remoteHeight], setRemoteImageDimensions] = useState([0, 0])
  const remoteAspectRatio = remoteWidth / remoteHeight
  const [maxWidth, maxHeight] = dimensions ?? []

  useLayoutEffect(() => {
    if (!remoteUri) return

    Image.getSize(remoteUri, (w, h) => setRemoteImageDimensions([w, h]))
  }, [remoteUri])

  if (Number.isNaN(remoteAspectRatio)) return [0, 0]

  if (maxWidth && maxHeight) {
    const aspectRatio = Math.min(maxWidth / remoteWidth, maxHeight / remoteHeight)
    return [remoteWidth * aspectRatio, remoteHeight * aspectRatio]
  } else if (maxWidth) {
    return [maxWidth, maxWidth / remoteAspectRatio]
  } else if (maxHeight) {
    return [maxHeight * remoteAspectRatio, maxHeight]
  } else {
    return [remoteWidth, remoteHeight]
  }
}

export default function AutoImage(props: AutoImageProps) {
  const [isError, setIsError] = useState(false);

  const handleLoadError = (error: any) => {
    setIsError(true);
  };

  const { maxWidth, maxHeight, ...ImageProps } = props
  const source = props.source as ImageURISource

  const [width, height] = useAutoImage(
    Platform.select({
      web: (source?.uri as string) ?? (source as string),
      default: source?.uri as string,
    }),
    [maxWidth, maxHeight],
  )

  return (
    <View>
      {isError ?
        (<View style={[{ borderWidth: 1, borderRadius: 100, width: maxWidth, height: maxWidth, justifyContent: 'center', alignItems: 'center' }, props.style]}>
          <Icon
            name={'image-remove'}
            size={30}
            color={COLOR_EVENT_ERROR}
          />
        </View>) : (<Image {...ImageProps} style={[{ width, height }, props.style]} onError={handleLoadError} />)}
    </View>
  )
}
