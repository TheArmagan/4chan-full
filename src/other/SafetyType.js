class SafetyType {
  static WORKSAFE = "ws";

  static NON_WORKSAFE = "nws";

  static COMBINED = "all";

}

class SafetyTypeReverse {
  static ws = "WORKSAFE";

  static nws = "NON_WORKSAFE";

  static all = "COMBINED";

}

module.exports = { SafetyType, SafetyTypeReverse }