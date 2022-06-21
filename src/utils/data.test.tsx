import {isFilterSelected, toggleList} from './data';

const mockFilters = ['Brad Pitt', 'Angelina Jolie'];

describe('dataUtils', () => {
  describe('ToggleList', () => {
    it('should add a new actor to the Array', () => {
      const unexistingActor = 'Leonardo Di Caprio';
      let newList = [...mockFilters];
      toggleList(newList, unexistingActor);
      expect(newList).toStrictEqual([...mockFilters, unexistingActor]);
    });
    it('should remove the actor from the list', () => {
      const existingActor = 'Brad Pitt';
      let newList = [...mockFilters];
      toggleList(newList, existingActor);
      expect(newList).toStrictEqual(['Angelina Jolie']);
    });
  });

  describe('isFilterSelected', () => {
    it('should not find the actor', () => {
      const unexistingActor = 'Leonardo Di Caprio';
      let newList = [...mockFilters];
      const res = isFilterSelected(newList, unexistingActor);
      expect(res).toBeFalsy();
    });
    it('should find the actor from the list', () => {
      const existingActor = 'Brad Pitt';
      let newList = [...mockFilters];
      const res = isFilterSelected(newList, existingActor);
      expect(res).toBeTruthy();
    });
  });
});
