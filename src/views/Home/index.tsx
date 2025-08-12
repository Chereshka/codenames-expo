import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

import { STYLES } from '@/styles'
import {
  GearSvg,
  PlaySvg,
  LoupeSvg,
  FourTilesSvg,
  ThreeBarsSvg,
  QuestionSvg,
  CrownSvg
} from '@/icons'
import { useDispatch } from 'react-redux'
import { setOpenModal } from '@/redux/Slices/Navigation'
import { SquareTile, WideTile } from './components/Tiles'
import { ArchiveSnap } from '../Archive';

import { useNavigation } from "expo-router";
import { getPuzzleIndexForDate } from '@/utils/puzzle';


const titleArray = 'COMBINATIONS'.split('')
const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const todayId = getPuzzleIndexForDate(new Date());
  const lastGame = {
    number: 349,
    date: 'lastGameDate'
  }

  const openSettings = () => {
    dispatch(setOpenModal('settings'));
  }

  const handleGameClick = (snap: ArchiveSnap | undefined) => {
    const isDaily = todayId === snap?.id;
    if (isDaily) {
      navigation.navigate({
        name: "index",
        params: { replace: true },
      } as never);
      return;
    }
    navigation.navigate({
      name: `game/[id]`,
      params: { id: snap?.id || 2, replace: true },
    } as never);
  };

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.screen}>
        <View style={{ gap: STYLES.PADDING.MIDDLE, marginBottom: STYLES.PADDING.MIDDLE }}>
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
                width: 28,
                height: 28,
                borderRadius: 6,
                textAlign: 'center',
                transform: [{
                  rotate: index % 2 === 0 ? '5deg' : '-5deg'
                }]
              }}>{el}</Text>
            )}
          </View>

          <WideTile
            onPress={handleGameClick}
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
            title={`YESTERDFAY'S ANSWERS`}
            text={`GAME BY JANURY 22, 2025`}
            backgroundColor='#ef946a'
            shadowColor="#ca7e5c"
            points={{
              current: 134,
              max: 247,
              fillColor: "#d9855f",
              valueColor: "#c37755"
            }}
            Icon={LoupeSvg}
          />

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: STYLES.PADDING.MIDDLE }}>
            <SquareTile
              onPress={() => { }}
              title="ARCHIVE"
              text={lastGame.date}
              backgroundColor='#52a6f7'
              shadowColor="#3d8fdc"

              Icon={FourTilesSvg}
            />
            <SquareTile
              onPress={() => { }}
              title="STATISTICS"
              text={lastGame.date}
              backgroundColor='#c275eb'
              shadowColor="#a75ad1"
              Icon={ThreeBarsSvg}
            />
            <SquareTile
              onPress={() => { }}
              title="HOW TO"
              text={lastGame.date}
              backgroundColor='#60d4cd'
              shadowColor="#4bb8b1"

              Icon={QuestionSvg}
            />
            <SquareTile
              onPress={() => { }}
              title="PREMIUM"
              text={lastGame.date}
              backgroundColor='#ffd980'
              shadowColor="#deb658"

              Icon={CrownSvg}
            />
          </View>
        </View>
      </ScrollView>
      <BannerAd
        unitId={__DEV__ ? TestIds.BANNER : 'YOUR_PRODUCTION_BANNER_AD_UNIT_ID'}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eff6fb',
    flex: 1,
  },
  screen: {
    paddingLeft: STYLES.PADDING.MIDDLE,
    paddingRight: STYLES.PADDING.MIDDLE
  },
  gearButton: { alignSelf: 'flex-end' },

})