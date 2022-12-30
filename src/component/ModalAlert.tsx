import React from 'react';
import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import Colors from '../util/Colors';
import Images from '../util/util';
interface Props {
  title?: string;
  modalVisible: boolean;
  setModalVisible: any;
}

const ModalAlert: React.FunctionComponent<Props> = ({
  title,
  modalVisible,
  setModalVisible,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image source={Images.IC_DONE} style={{height: 50, width: 50}} />
          <Text style={{color: Colors.white, fontSize: 16, marginTop: 10}}>
            {title}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    paddingVertical: 14,
    width: 200,
    backgroundColor: Colors.tabbar,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  indicator: {},
});
export default ModalAlert;
