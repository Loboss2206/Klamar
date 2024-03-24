import IQuestion from "../interfaces/IQuestion";

export const questionsList: IQuestion[] = [
  {
    "id": "1",
    "question": "Quelle est la capitale de la France ?",
    "tips": [
      "La ville de l\\'amour", "La ville lumière"
    ],
    "AreResponsesImages": false,
    "responses": [
      "Paris", "Londres", "New York", "Berlin"],
    "answer": "Paris",
    "tags": ["géographie"]
  },
  {
    "id": "2",
    "question": "Quelle est la capitale de l\"Allemagne ?",
    "tips": ["Elle a un mur célèbre", "Elle n\"est pas Munich"],
    "AreResponsesImages": true,
    "responses": ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/280px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/London_Montage_L.jpg/280px-London_Montage_L.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Lower_Manhattan_skyline_-_June_2017.jpg/280px-Lower_Manhattan_skyline_-_June_2017.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Cityscape_Berlin.jpg/400px-Cityscape_Berlin.jpg"],
    "answer": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Cityscape_Berlin.jpg/400px-Cityscape_Berlin.jpg",
    "tags": ["géographie"]
  },
  {
    "id": "3",
    "question": "Quelle est la capitale du Royaume-Uni ?",
    "questionImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/London_Montage_L.jpg/280px-London_Montage_L.jpg",
    "tips": ["Elle a un grand ben", "Elle n\"est pas Manchester"],
    "AreResponsesImages": false,
    "responses": ["Paris", "Londres", "New York", "Berlin"],
    "answer": "Londres",
    "tags": ["géographie"]
  },
  {
    "id": "4",
    "question": "Quelle est la capitale des États-Unis ?",
    "questionImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Usa_edcp_%28%2BHI_%2BAK%29_relief_location_map.png/280px-Usa_edcp_%28%2BHI_%2BAK%29_relief_location_map.png",
    "tips": ["Elle a une grande pomme", "Elle n\"est pas Los Angeles"],
    "AreResponsesImages": true,
    "responses": ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/280px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/London_Montage_L.jpg/280px-London_Montage_L.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/White_House_lawn_%28long_tightly_cropped%29.jpg/280px-White_House_lawn_%28long_tightly_cropped%29.jpg", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Cityscape_Berlin.jpg/400px-Cityscape_Berlin.jpg"],
    "answer": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/White_House_lawn_%28long_tightly_cropped%29.jpg/280px-White_House_lawn_%28long_tightly_cropped%29.jpg",
    "tags": ["géographie"]
  },
  {
    "id": "5",
    "question": "Quel est le plus grand désert du monde ?",
    "tips": ["Il est en Afrique", "Il n\"est pas le Gobi"],
    "AreResponsesImages": false,
    "responses": ["Sahara", "Gobi", "Kalahari", "Arctique"],
    "answer": "Sahara",
    "tags": ["géographie"]
  },
  {
    "id": "6",
    "question": "Quel est le plus long fleuve du monde ?",
    "tips": [
      "Il est en Amérique du Sud",
      "Il n\"est pas le Nil"
    ],
    "AreResponsesImages": false,
    "responses": [
      "Le Nil",
      "L\"Amazone",
      "Le Yangtsé",
      "Le Mississippi"
    ],
    "answer": "L\"Amazone",
    "tags": [
      "géographie"
    ]
  }
]
