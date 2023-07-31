# Project Title

This Project is used to create codebase mobile react native

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
Node Package Manager
React Native
Android Studio
Xcode
....
```
#### Google Maps 
https://github.com/react-native-maps/react-native-maps/blob/HEAD/docs/installation.md

#### Setup custon font and icon
* For iOS:

1. Create a folder in your project directory, let's say assets/fonts, and place your font files (.ttf or .otf format) inside this folder.

2. Open your Xcode project by navigating to the ios folder of your React Native project and opening the .xcworkspace file in Xcode.

3. In Xcode, right-click on your project name in the Project Navigator and select "Add Files to [Your Project Name]".

4. Navigate to the assets/fonts folder and select all the font files you added.

5. Make sure the font files are added to your app target. You can check this in the "Add to targets" section while adding the files. Also, ensure that the files are listed under the "Copy Bundle Resources" build phase of your target.

6. Open the Info.plist file (usually located in the main project folder) and add the following lines to specify the font files in your app:
xml
Copy code
```

<key>UIAppFonts</key>
<array>
  <string>FontFileName1.ttf</string>
  <string>FontFileName2.ttf</string>
  <!-- Add more font file names if needed -->
</array>
```
7. Replace FontFileName1.ttf, FontFileName2.ttf, etc. with the actual font file names.

8. Save the changes and rebuild your app in Xcode.


* For Android:

1. Create a folder in your project directory, let's say assets/fonts, and place your font files (.ttf or .otf format) inside this folder.

2. Open the android/app/build.gradle file and add the following code inside the android block:

```
android {
    defaultConfig {
      ...
    }

    // Place the 'assets' block here, outside the 'defaultConfig' block
    assets {
        fontFolder 'src/main/assets/fonts'
    }

   dependencies {
    // ...

    // Add the following line to include react-native-vector-icons library
    implementation project(':react-native-vector-icons')
}
}
```
3. Replace FontFileName1.ttf, FontFileName2.ttf, etc. with the actual font file names.

4. Sync the changes by running gradlew from the android folder of your project:

5. Rebuild your app by running react-native run-android or rebuilding from Android Studio.

### Rename App and package

Explain how to rename App and Package
```sh
Give the example
...
$ yarn add react-native-rename -g
$ react-native-rename newName -b bundleIdentifier
    ex: react-native-rename "codebase mobile" -b co.id.andomus.codebasemobile
```
### Change App Logo and Splash screen
* ### ios Logo
   - Replace the default icon files with your own image files in the "Assets.xcassets" folder in the Xcode project of your React Native app.

    - The icon files are located in the "AppIcon" asset catalog.
    The files are named according to their size and screen density, for example "AppIcon-60x60@2x.png" for the 120x120 pixel image on a retina display.
    Update the "CFBundleDisplayName" and "CFBundleName" keys in the "Info.plist" file of your React Native app with the name of your app.

    - The "CFBundleDisplayName" key specifies the name of the app that is displayed on the home screen.
The "CFBundleName" key specifies the name of the app as it appears in the App Store.

    - Build and run your React Native app in Xcode to see the updated app logo.

##### Note: It's important to ensure that your app logo meets Apple's guidelines and requirements for app icons, which can be found in the Apple Human Interface Guidelines.


* #### ios splashscreen
   - open RnMiciTemplate.xcodeproj in xcode
   - in xcode ,drag n drop images to RnMiciTemplate/images
   - in project directory, open LaunchScreen , and edit
   - open the Object Library in Xcode / Shift + Command + L.
   - select uiimageview and drag to canvas 

* #### android logo and splashscreen
    - open android/app/src/main/res 
    - replace all files named ic_launcher_round.png & ic_launcher.png
    

Explain how to rename App and Package
```sh
Give the example
...
$ npm install react-native-rename -g
$ react-native-rename newName -b bundleIdentifier
    ex: react-native-rename "codebase mobile" -b co.id.andomus.codebasemobile
```

### Development
* shorting Url 
 ../path/to/url/so/deep.js to @so/deep.js ,
 configure path in ./babel.config.js and tsconfig.json then reset chace




### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be
- Create ENV file (.env) with this configuration:
```
API_BASE_URL=
CIPHER_KEY=
```
- Then run this command
```
Give the example
...
$ npm install
$ react native run-android or react native run-ios
```

### Running the tests

Explain how to run the automated tests for this system
```sh
Give the example
...
$ npm run test
```

### And coding style tests

Explain source code formatting for this project

```sh
$ npm run eslint
```
To fix simple error code format, run this command
```sh
$ npm run eslint:fix
```

### Deployment

Add additional notes about how to deploy this on a live system

### Built With

* [Npm] - Dependency Management

### README Authors

* **TelkomDev** - *Initial work* - [Gitlab](https://gitlab.playcourt.id/telkomdev)


### License

This project is licensed under Telkom Indonesia License - see the [LICENSE.md](LICENSE.md) file for details


https://pictogrammers.com/library/mdi/