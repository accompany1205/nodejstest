// Counter returns object with `counter` property indicating how many sources were passed

class Counter {
  static handle(...sources) {
    return (sources || []).reduce(
      (acc) => ({
        result: acc.result + 1,
      }),
      {
        result: 0,
      },
    );
  }
}

module.exports = Counter;
