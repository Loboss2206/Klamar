import IUser from "../interfaces/IUser";

export const users: IUser[] = [
  {
    id: 1,
    name: "Boulet",
    firstname: "John",
    config: {
      simon: {
        isColorful: true,
      },
      memory: {
        timeBeforeSwitching: 2,
      },
      simonHints: {
        displayTheFullSequenceAfter: 2000,
      },
      memoryHints: {
        timeBeforeHints: 10,
      },
      quiz: {
        showHintAfterError: true,
        showHintAfterStart: true,
        showHintAfterClick: true,
        showHintOneByOne: true,
      },
      zoomLevel: 1,
    },
    avatar: "https://st3.depositphotos.com/3584053/33351/i/450/depositphotos_333513864-stock-photo-senior-mushroomer-happy-ol-man.jpg"
  },
  {
    id: 2,
    name: "Malouin",
    firstname: "Jeanne",
    config: {
      simon: {
        isColorful: false,
      },
      memory: {
        timeBeforeSwitching: 2,
      },
      simonHints: {
        displayTheFullSequenceAfter: 2000,
      },
      memoryHints: {
        timeBeforeHints: 10,
      },
      quiz: {
        showHintAfterError: false,
        showHintAfterStart: false,
        showHintAfterClick: false,
        showHintOneByOne: false,
      },
      zoomLevel: 1,
    },
    avatar: "https://ts2.mm.bing.net/th?q=des%20vieilles%20femmes"
  },
  {
    id: 3,
    name: "Henry",
    firstname: "Genevieve",
    config: {
      simon: {
        isColorful: true,
      },
      memory: {
        timeBeforeSwitching: 2,
      },
      simonHints: {
        displayTheFullSequenceAfter: 2000,

      },
      memoryHints: {
        timeBeforeHints: 10,
      },
      quiz: {
        showHintAfterError: true,
        showHintAfterStart: false,
        showHintAfterClick: false,
        showHintOneByOne: true,
      },
      zoomLevel: 1,
    },
    avatar: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmllaWxsZSUyMGZlbW1lfGVufDB8fDB8fHww"
  },
  {
    id: 4,
    name: "Dylan",
    firstname: "Bob",
    config: {
      simon: {
        isColorful: true,
      },
      memory: {
        timeBeforeSwitching: 2,
      },
      simonHints: {
        displayTheFullSequenceAfter: 2000,

      },
      memoryHints: {
        timeBeforeHints: 10,
      },
      quiz: {
        showHintAfterError: false,
        showHintAfterStart: true,
        showHintAfterClick: true,
        showHintOneByOne: false,
      },
      zoomLevel: 1,
    },
    avatar: "https://img.freepik.com/photos-premium/vieil-homme-age-fait-grimaces-fait-grimace-montre-sa-langue-homme-drole-fou_340855-1537.jpg"
  }
]

