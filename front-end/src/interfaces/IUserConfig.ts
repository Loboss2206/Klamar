export interface IUserConfig {
  id: number;
  simon: {
    isColorful: boolean;
  },
  memory: {
    timeBeforeSwitching: number;
  },
  simonHints: {
    displayTheFullSequenceAfter: number;
  };
  memoryHints: {
    timeBeforeHints: number;
  };
  quiz: {
    showHintAfterError: boolean;
    showHintAfterStart: boolean;
    showHintAfterClick: boolean;
    showHintOneByOne: boolean;
  };
  zoomLevel: number;
}
