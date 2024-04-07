export interface IUserConfig {
  simon: {
    isColorful: boolean;
  },
  simonHints: {
    displayTheFullSequenceAfter: number;
  };
  memoryHints: {
    displayTheFullSequenceAfter: number;
  };
  quiz: {
    showHintAfterError: boolean;
    showHintAfterStart: boolean;
    showHintAfterClick: boolean;
    showHintOneByOne: boolean;
  };
  zoomLevel: number;
}
