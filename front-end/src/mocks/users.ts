import IUser from "../interfaces/IUser";

export const users: IUser[] = [
  {
    id: 1,
    name: "Boulet",
    firstname: "John",
    birthdate: "01/08/1950",
    hobbies: "Pétanque, Chasse, Pêche, Champignons",
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
    charts: ['Chart1', 'Chart2', 'Chart3', 'Chart4', 'Chart5', 'Chart6', 'Chart7'],
    statsId: [2, 4],
    avatar: "https://st3.depositphotos.com/3584053/33351/i/450/depositphotos_333513864-stock-photo-senior-mushroomer-happy-ol-man.jpg",
    colorBlind: "protanopia"
  },
  {
    id: 2,
    name: "Malouin",
    firstname: "Jeanne",
    birthdate: "11/11/1947",
    hobbies: "Tricot, Cuisine, Jardinage, Scrabble",
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
    charts: ['Chart1', 'Chart2', 'Chart3', 'Chart4', 'Chart5', 'Chart6', 'Chart7'],
    statsId: [1, 3],
    avatar: "https://ts2.mm.bing.net/th?q=des%20vieilles%20femmes",
    colorBlind: "achromatopsia"
  },
  {
    id: 3,
    name: "Henry",
    firstname: "Genevieve",
    birthdate: "28/09/1956",
    hobbies: "Couture, Lecture, Randonnée",
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
    charts: ['Chart1', 'Chart2', 'Chart3', 'Chart4', 'Chart5', 'Chart6', 'Chart7'],
    statsId: [1, 2, 3, 4],
    avatar: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmllaWxsZSUyMGZlbW1lfGVufDB8fDB8fHww",
    colorBlind: "tritanopia"
  },
  {
    id: 4,
    name: "Dylan",
    firstname: "Bob",
    birthdate: "24/05/1961",
    hobbies: "Musique, Peinture, Ecriture",
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
    charts: ['Chart1', 'Chart2', 'Chart3', 'Chart4', 'Chart5', 'Chart6', 'Chart7'],
    statsId: [1],
    avatar: "https://img.freepik.com/photos-premium/vieil-homme-age-fait-grimaces-fait-grimace-montre-sa-langue-homme-drole-fou_340855-1537.jpg",
    colorBlind: ""
  }
]

