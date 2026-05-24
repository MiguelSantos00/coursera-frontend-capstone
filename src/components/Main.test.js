import { initializeTimes, updateTimes } from './Main';

beforeEach(() => {
  window.fetchAPI = jest.fn(() => ['17:00', '18:00', '19:00', '20:00', '21:00']);
});

test('initializeTimes returns the expected available times', () => {
  const expectedTimes = ['17:00', '18:00', '19:00', '20:00', '21:00'];

  expect(initializeTimes()).toEqual(expectedTimes);
  expect(window.fetchAPI.mock.calls[0][0]).toBeInstanceOf(Date);
});

test('updateTimes returns the same state when called', () => {
  const currentTimes = ['17:00', '18:00', '19:00'];
  window.fetchAPI = jest.fn(() => currentTimes);
  const selectedDate = '2026-05-24';

  expect(updateTimes(currentTimes, { type: 'date_changed', date: selectedDate })).toBe(currentTimes);
  expect(window.fetchAPI).toHaveBeenCalledWith(new Date(selectedDate));
});