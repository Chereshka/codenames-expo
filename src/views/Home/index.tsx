import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { STYLES } from '@/styles'
import { 
  GearSvg, 
  PlaySvg 
} from '@/icons'
import { useDispatch } from 'react-redux'
import { setOpenModal } from '@/redux/Slices/Navigation'
import { SquareTile, WideTile } from './components/Tiles'
const titleArray = 'COMBINATIONS'.split('')
const Home = () => {
  const dispatch = useDispatch();

  const lastGame = {
    number: 349,
    date: 'lastGameDate'
  }

  const openSettings = () => {
    dispatch(setOpenModal('settings'));
  }
  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={{ alignSelf: 'flex-end' }} onPress={openSettings}>
        <GearSvg />
      </Pressable>

      <View style={{ flexDirection: 'row', gap: -2, alignSelf: 'center' }}>
        {titleArray.map((el, index) =>
          <Text style={{
            borderWidth: 2,
            borderColor: 'gray',
            fontSize: 20,
            fontWeight: '700',
            width: 24,
            height: 24,
            borderRadius: 6,
            textAlign: 'center',
            transform: [{
              rotate: index % 2 === 0 ? '5deg' : '-5deg'
            }]
          }}>{el}</Text>
        )}
      </View>

      <WideTile
        onPress={() => { }}
        title={`DAILY GAME #${lastGame.number}`}
        text={lastGame.date}
        backgroundColor='#5ccd71'
        shadowColor="#42b158"
        points={{
          current: 134,
          max: 247,
          fillColor: "#4eba63",
          valueColor: "#42b158"
        }}
        Icon={PlaySvg}
      />

      <WideTile
        onPress={() => { }}
        title={`DAILY GAME #${lastGame.number}`}
        text={lastGame.date}
        backgroundColor='#5ccd71'
        shadowColor="#42b158"
        points={{
          current: 134,
          max: 247,
          fillColor: "#4eba63",
          valueColor: "#42b158"
        }}
        Icon={GearSvg}
      />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: STYLES.PADDING.MIDDLE }}>
        <SquareTile
          onPress={() => { }}
          title={`DAILY GAME #${lastGame.number}`}
          text={lastGame.date}
          backgroundColor='#5ccd71'
          shadowColor="#42b158"

          Icon={PlaySvg}
        />
        <SquareTile
          onPress={() => { }}
          title={`DAILY GAME #${lastGame.number}`}
          text={lastGame.date}
          backgroundColor='#5ccd71'
          shadowColor="#42b158"

          Icon={GearSvg}
        />
        <SquareTile
          onPress={() => { }}
          title={`DAILY GAME #${lastGame.number}`}
          text={lastGame.date}
          backgroundColor='#5ccd71'
          shadowColor="#42b158"

          Icon={GearSvg}
        />
        <SquareTile
          onPress={() => { }}
          title={`DAILY GAME #${lastGame.number}`}
          text={lastGame.date}
          backgroundColor='#5ccd71'
          shadowColor="#42b158"

          Icon={GearSvg}
        />
      </View>

    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eff6fb',
    flex: 1,
    paddingTop: STYLES.PADDING.EXTRA_BIG,
    paddingLeft: STYLES.PADDING.MIDDLE,
    paddingRight: STYLES.PADDING.MIDDLE,
    gap: STYLES.PADDING.MIDDLE,
  },
  gearButton: { alignSelf: 'flex-end' },

})