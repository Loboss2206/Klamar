import IQuestion from "../interfaces/IQuestion";

export const questionsList: IQuestion[] = [
  {
    "id": "1",
    "question": "Quelle est la capitale de la France ?",
    "tips": [
      "La ville de l\'amour", "La ville lumière"
    ],
    "AreResponsesImages": false,
    "responses": [
      "Paris", "Londres", "New York", "Berlin"],
    "answer": "Paris",
    "tags": ["géographie"]
  },
  {
    "id": "2",
    "question": "Quelle est la capitale de l\'Allemagne ?",
    "tips": ["Elle avait un mur très célèbre", "Elle n\'est pas Munich"],
    "AreResponsesImages": true,
    "responses": ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/280px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/London_Montage_L.jpg/280px-London_Montage_L.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Lower_Manhattan_skyline_-_June_2017.jpg/280px-Lower_Manhattan_skyline_-_June_2017.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Cityscape_Berlin.jpg/400px-Cityscape_Berlin.jpg"],
    "answer": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Cityscape_Berlin.jpg/400px-Cityscape_Berlin.jpg",
    "tags": ["géographie"]
  },
  {
    "id": "3",
    "question": "Quelle est la capitale du Royaume-Uni ?",
    "questionImage": "https://img.freepik.com/photos-gratuite/big-ben-westminster-bridge-au-coucher-du-soleil-londres-royaume-uni_268835-1395.jpg",
    "tips": ["Big Ben s'y trouve", "Elle n\'est pas Manchester"],
    "AreResponsesImages": false,
    "responses": ["Paris", "Londres", "New York", "Manchester"],
    "answer": "Londres",
    "tags": ["géographie"]
  },
  {
    "id": "4",
    "question": "Quelle est la capitale des États-Unis ?",
    "questionImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Usa_edcp_%28%2BHI_%2BAK%29_relief_location_map.png/280px-Usa_edcp_%28%2BHI_%2BAK%29_relief_location_map.png",
    "tips": ["Un batiment célèbre de cette capitale est la maison blanche", "Elle n\'est pas Los Angeles"],
    "AreResponsesImages": true,
    "responses": ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/280px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg", "https://img.freepik.com/photos-gratuite/big-ben-westminster-bridge-au-coucher-du-soleil-londres-royaume-uni_268835-1395.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/White_House_lawn_%28long_tightly_cropped%29.jpg/280px-White_House_lawn_%28long_tightly_cropped%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Cityscape_Berlin.jpg/400px-Cityscape_Berlin.jpg"],
    "answer": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/White_House_lawn_%28long_tightly_cropped%29.jpg/280px-White_House_lawn_%28long_tightly_cropped%29.jpg",
    "tags": ["géographie"]
  },
  {
    "id": "5",
    "question": "Quel est le plus grand désert du monde ?",
    "tips": ["Il n'est pas en Afrique", "Il n\'est pas le Gobi"],
    "AreResponsesImages": false,
    "responses": ["Sahara", "Gobi", "Kalahari", "Arctique"],
    "answer": "Arctique",
    "tags": ["géographie"]
  },
  {
    "id": "6",
    "question": "Quel est le plus long fleuve du monde ?",
    "tips": [
      "Il est en Amérique du Sud",
      "Il n\'est pas le Nil"
    ],
    "AreResponsesImages": false,
    "responses": [
      "Le Nil",
      "L\'Amazone",
      "Le Yangtsé",
      "Le Mississippi"
    ],
    "answer": "L\'Amazone",
    "tags": [
      "géographie"
    ]
  },
  {
    "id": "7",
    "question": "Quel est le plus grand océan du monde ?",
    "tips": [
      "Il est au sud de l\'Asie",
      "Il n\'est pas l\'Atlantique"
    ],
    "AreResponsesImages": false,
    "responses": [
      "L\'Atlantique",
      "L\'Arctique",
      "L\'Indien",
      "Le Pacifique"
    ],
    "answer": "Le Pacifique",
    "tags": [
      "géographie"
    ]
  },
  {
    "id": "8",
    "question": "Quelle est la capitale de l\'Australie ?",
    "tips": [
      "Elle est en Australie",
      "Elle n\'est pas Sydney"
    ],
    "AreResponsesImages": false,
    "responses": [
      "Canberra",
      "Sydney",
      "Melbourne",
      "Brisbane"
    ],
    "answer": "Canberra",
    "tags": [
      "géographie"
    ]
  },
  {
    "id": "9",
    "question": "Quelle est la capitale de l\'Italie ?",
    "tips": [
      "Elle est en Italie",
      "Elle n\'est pas Milan"
    ],
    "AreResponsesImages": false,
    "responses": [
      "Rome",
      "Milan",
      "Naples",
      "Turin"
    ],
    "answer": "Rome",
    "tags": [
      "géographie"
    ]
  },
  {
    "id": "10",
    "question": "Quelle est la capitale de l\'Espagne ?",
    "tips": [
      "Elle est en Espagne",
      "Elle n\'est pas Barcelone"
    ],
    "AreResponsesImages": false,
    "responses": [
      "Madrid",
      "Barcelone",
      "Valence",
      "Séville"
    ],
    "answer": "Madrid",
    "tags": [
      "géographie"
    ]
  },
  {
    "id": "11",
    "question": "Quelle est la capitale de la Russie ?",
    "tips": [
      "Elle est en Russie",
      "Elle n\'est pas Saint-Pétersbourg"
    ],
    "AreResponsesImages": false,
    "responses": [
      "Moscou",
      "Saint-Pétersbourg",
      "Kazan",
      "Sotchi"
    ],
    "answer": "Moscou",
    "tags": [
      "géographie"
    ]
  }
]
