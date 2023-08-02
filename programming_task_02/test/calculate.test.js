// Import the necessary modules and functions
const { calculate } = require('../src/calculate');
const { Action } = require('../src/models/action');

// Mock the Action class methods
jest.mock('../src/models/action', () => ({
  Action: {
    getById: jest.fn(),
  },
}));

describe('calculate', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should calculate the value for COUNTER handler', async () => {
    // Mock the Action.getById method to return a dummy action with handler "COUNTER"
    Action.getById.mockResolvedValueOnce({
      handler: 'COUNTER',
      getChildActions: jest.fn().mockResolvedValue([]), // Empty child actions for COUNTER handler
    });

    const actionId = 'dummy-action-id';
    const result = await calculate(actionId);

    expect(result).toBe(0); // Since there are no child actions, the COUNTER value should be 0
    expect(Action.getById).toHaveBeenCalledWith(actionId);
  });

  it('should calculate the value for non-COUNTER handler', async () => {
    // Mock the Action.getById method to return a dummy action with a non-COUNTER handler
    Action.getById.mockResolvedValueOnce({
      handler: 'OTHER_HANDLER',
      getChildActions: jest.fn().mockResolvedValue([
        {
          id: 'child-action-id-1',
          handler: 'COUNTER',
          getChildActions: jest.fn().mockResolvedValue([]), // Empty child actions for COUNTER handler
        },
        {
          id: 'child-action-id-2',
          handler: 'COUNTER',
          getChildActions: jest.fn().mockResolvedValue([]), // Empty child actions for COUNTER handler
        },
      ]),
    });

    const actionId = 'dummy-action-id';
    const result = await calculate(actionId);

    expect(result).toBe(0); // Since the non-COUNTER handler multiplies child values, 0 * 0 = 0
    expect(Action.getById).toHaveBeenCalledWith(actionId);
  });

  // Add more test cases as needed to cover different scenarios
});
