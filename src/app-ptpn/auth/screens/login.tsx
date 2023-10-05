// import React, { useEffect, useRef, useState } from 'react';
// import { View, StatusBar, Image } from 'react-native';
// import Toast from 'react-native-toast-message';
// import styles from '../styles';

// import { BaseView, Text, Input, Button } from '@components';

// import { spacing } from '@constants/spacing';
// import { COLOR_WHITE } from '@themes/index';
// import IMAGES from '@images';
// import { useAuth } from '@authApp/hooks/useAuth';
// import { BlurView } from '@react-native-community/blur';

// const textinput = [
//   {
//     title: 'username',
//     type: 'text',
//   },
//   {
//     title: 'password',
//     type: 'password',
//   },
// ];

// const Screen = () => {
//   const { doLogin, state, actions } = useAuth();
//   const submit = () => {
//     if (state.userName == '') {
//       Toast.show({
//         type: 'error',
//         text1: 'Di isi dulu kolom nya ya ',
//       });
//       actions.seterrUserName('Username Tidak boleh kosong');
//     } else doLogin(state.userName, state.password);
//   };

//   const [inputValues, setInputValues] = useState({});
//   const inputRefs = textinput.map(() => useRef(null));

//   useEffect(() => {
//     console.log('inputValues :>> ', inputValues);
//   }, [inputValues]);

//   const handleInputChange = (title: string, text: any) => {
//     setInputValues({ ...inputValues, [title]: text });
//   };

//   const handleSubmit = (index: number) => {
//     if (index < textinput.length - 1) {
//       inputRefs[index + 1].current.focus();
//     }
//   };

//   return (
//     <BaseView bg={IMAGES.bgPtpn}>
//       <StatusBar translucent backgroundColor={'transparent'} />
//       <View style={styles.logoHeaderWrap}>
//         <View style={styles.logoWrap}>
//           <Image
//             source={IMAGES.LogoCitata}
//             style={{ height: 150, width: 150 }}
//             resizeMode="contain"
//             resizeMethod="resize"
//           />
//         </View>
//         <Text size="header" weight="bold" color={COLOR_WHITE}>
//           Masuk Akun
//         </Text>
//         <Text size="subTitle" color={COLOR_WHITE}>
//           Silakan masuk dengan Akun yang terdaftar
//         </Text>
//       </View>
//       <View style={styles.botLoginWrap}>
//         <BlurView
//           style={styles.blurWrap}
//           blurType="light"
//           blurAmount={2}
//           reducedTransparencyFallbackColor="white"
//         >
//           <View style={styles.innerLoginWrap}>
//             {textinput.map((input, index) => (
//               <Input
//                 label={inputValues[input.title]}
//                 key={index}
//                 ref={inputRefs[index]}
//                 placeholder={input.title}
//                 keyboardType={input.type === 'number' ? 'numeric' : 'default'}
//                 returnKeyType={index === textinput.length - 1 ? 'done' : 'next'}
//                 value={inputValues[input.title] || ''}
//                 onInteract={(text: string) => handleInputChange(input.title, text)}
//                 onSubmitEditing={() => handleSubmit(index)}
//               />
//             ))}
//             <View style={{ marginVertical: spacing.sm }}>
//               <Button title="Masuk" onPress={() => submit()} />
//             </View>
//           </View>
//         </BlurView>
//       </View>
//     </BaseView>
//   );
// };

// export default Screen;
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { open } from 'react-native-quick-sqlite';
import jsonData from '../store/testing.json'; // Adjust the path accordingly
import { FlashList } from '@shopify/flash-list';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';

interface IDataMasterPTPN {
  name: String;
}

interface IDataMasterKebun extends IDataMasterPTPN {
  id_master_ptpn: number;
}

const YourComponent = () => {
  // const [name, setName] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [progress, setprogress] = useState(0);
  const db = open({ name: 'testx.db' });

  useEffect(() => {
    ReactNativeForegroundService.add_task(() => log(), {
      delay: 1000,
      onLoop: true,
      taskId: 'taskid',
      onError: e => console.log(`Error logging`, e),
    });
  }, []);

  const testing = async () => {
    try {
      db.execute(
        `CREATE TABLE IF NOT EXISTS Persons (Id INTEGER PRIMARY KEY AUTOINCREMENT,Name TEXT)`
      );
    } catch (e) {
      console.error('Something went wrong executing SQL commands:', e.message);
    }
  };

  let _prog = 0;
  const log = () => {
    _prog += 10;
    ReactNativeForegroundService.update({
      id: 1244,
      title: 'Foreground Service',
      message: 'We are live World',
      icon: 'ic_launcher',
      button: true,
      button2: true,
      buttonText: 'Button',
      button2Text: 'Anther Button',
      buttonOnPress: 'cray',
      setOnlyAlertOnce: true,
      color: '#000000',
      progress: {
        max: 100,
        curr: _prog,
      },
    });
    setprogress(_prog);
    console.log(`logging`);
    console.log(`progressx`, _prog);
    _prog == 100 && stopService();
  };

  useEffect(() => {
    // ReactNativeForegroundService.add_task(
    //   () => {
    //     setInterval(() => {
    //       setprogress(progress + 5);
    //     }, 500);
    //   },
    //   {
    //     delay: 1000,
    //     onLoop: true,
    //     taskId: 'taskid',
    //     onError: e => console.log(`Error logging:`, e),
    //   }
    // );
    testing();
    // Open a database connection
    // const dbInstance = SQLite.openDatabase(
    //   { name: 'ptpn.db' },
    //   () => {
    //     // Create the table if it doesn't exist
    //     dbInstance.transaction(tx => {
    //       tx.executeSql(
    //         'CREATE TABLE IF NOT EXISTS master_ptpn (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)',
    //         // 'CREATE TABLE IF NOT EXISTS master_kebun (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,id_master_ptpn INTEGER)',
    //         // 'CREATE TABLE IF NOT EXISTS master_afdeling (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,id_master_ptpn INTEGER,id_master_kebun INTEGER)',
    //         // 'CREATE TABLE IF NOT EXISTS master_blok (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT,id_master_ptpn INTEGER,id_master_ptpn INTEGER,id_master_kebun INTEGER,id_master_afdeling INTEGER,)',
    //         []
    //       );
    //     });
    //   },
    //   error => {
    //     console.error('Error opening database:', error);
    //   }
    // );
    // setDb(dbInstance);
  }, []);

  const fetchAllData = () => {
    let { rows } = db.execute('SELECT * FROM Persons');
    console.log('rows :>> ', rows);
    setData(rows._array);
    setisLoading(false);
  };

  const handleDrop = name => {
    setisLoading(true);
    let drop = db.execute(`DROP TABLE IF EXISTS Persons`);
    console.log('drop :>> ', drop.rowsAffected);
    setData([]);
    setisLoading(false);
  };

  const handleDelete = id => {
    console.log('id :>> ', id);
    db.execute(`DELETE FROM Persons WHERE Id = ${id}`);
    fetchAllData();
  };

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const startFetch = params => {
    ReactNativeForegroundService.start({
      id: 1244,
      title: 'Foreground Service',
      message: 'We are live World',
      icon: 'ic_launcher',
      button: true,
      button2: true,
      buttonText: 'Button',
      button2Text: 'Anther Button',
      buttonOnPress: 'cray',
      setOnlyAlertOnce: true,
      color: '#000000',
      progress: {
        max: 100,
        curr: _prog,
      },
    });
    // insertKebunData();
  };

  const stopService = () => {
    ReactNativeForegroundService.stopAll();
  };

  const insertKebunData = async () => {
    setisLoading(true);
    const features = jsonData.features;
    const delayBetweenIterations = 5; // Delay in milliseconds between each iteration

    for (let i = 0; i < features.length; i++) {
      const blokName = features[i].attributes.blok;
      await handleCreate(blokName);

      // Introduce a delay between iterations
      await delay(delayBetweenIterations);
    }

    // All features processed, fetch all data
    fetchAllData();
  };

  const handleCreate = async name => {
    try {
      let create = await db.execute(
        `INSERT INTO Persons (Name) VALUES ('${name}')`
      );
      console.log('create :>> ', create.insertId);
      persenan(create.insertId);
    } catch (error) {
      console.error('Error inserting data: ', error);
      throw error; // Re-throw the error to handle it further if needed
    }
  };

  const persenan = params => {
    const features = jsonData.features;
    let percentage = (params / features.length) * 100;
    setprogress(parseFloat(percentage.toFixed(2)));
  };

  return (
    <View>
      {/* <TextInput
        placeholder="Enter a name"
        value={name}
        onChangeText={text => setName(text)}
      /> */}
      <Button title="Create Record" onPress={testing} />
      <Button title="DROP TABLE" onPress={handleDrop} />
      <Button title="Fetch Data" onPress={fetchAllData} />
      <Button title="Insert Data" onPress={startFetch} />
      <Button title="stop service" onPress={stopService} />
      <Text style={{ fontWeight: 'bold', color: 'black' }}>{progress}%</Text>
      {isLoading && <ActivityIndicator />}
      <Text>Data:</Text>
      <View style={{ borderWidth: 1, height: 800 }}>
        <FlashList
          data={data}
          estimatedItemSize={10000}
          renderItem={({ item }) => {
            return (
              <View
                key={item.id}
                style={{ width: '100%', height: 100, borderWidth: 1 }}
              >
                <Text>Blok : {item.Name}</Text>
                <Button title="Delete" onPress={() => handleDelete(item.Id)} />
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default YourComponent;
