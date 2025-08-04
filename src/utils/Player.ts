import { Audio } from "expo-av";

export class Sounds {
  c1?: Audio.Sound;
  c2?: Audio.Sound;
  c3?: Audio.Sound;
  c4?: Audio.Sound;
  fail?: Audio.Sound;
  correct?: Audio.Sound;
  current: number;
  loaded: boolean;

  constructor() {
    this.current = 0;
    this.loaded = false;
  }

  public async init() {
    const { sound: c1 } = await Audio.Sound.createAsync(
      require("@/../assets/sound/c1.mp3")
    );
    const { sound: c2 } = await Audio.Sound.createAsync(
      require("@/../assets/sound/c2.mp3")
    );
    const { sound: c3 } = await Audio.Sound.createAsync(
      require("@/../assets/sound/c3.mp3")
    );
    const { sound: c4 } = await Audio.Sound.createAsync(
      require("@/../assets/sound/c4.mp3")
    );
    const { sound: correct } = await Audio.Sound.createAsync(
      require("@/../assets/sound/correct.mp3")
    );
    const { sound: fail } = await Audio.Sound.createAsync(
      require("@/../assets/sound/cancel.mp3")
    );
    this.c1 = c1;
    this.c2 = c2;
    this.c3 = c3;
    this.c4 = c4;
    this.correct = correct;
    this.fail = fail;
    this.loaded = true;
  }

  public Click() {
    switch (this.current) {
      case 0:
        this.c1?.replayAsync();
        break;
      case 1:
        this.c2?.replayAsync();
        break;
      case 2:
        this.c3?.replayAsync();
        break;
      case 3:
        this.c4?.replayAsync();
        break;
      default:
        break;
    }
    this.current = (this.current + 1) % 4;
  }

  public soundFail() {
    this.fail?.replayAsync();
  }

  public soundCorrect() {
    this.correct?.replayAsync();
  }
}
