import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {MaterialIndicator} from 'react-native-indicators';
import Colors from '../util/Colors';
interface Props {
  modalVisible: boolean;
  setModalVisible: any;
}

const ModalLoader: React.FunctionComponent<Props> = ({
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
          <MaterialIndicator
            color={Colors.white}
            size={60}
            style={styles.indicator}
          />
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
    height: 100,
    width: 100,
    margin: 20,
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 35,
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
export default ModalLoader;
