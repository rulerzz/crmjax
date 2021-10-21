class ProgramError extends Error {
    constructor(message) {
      super(message);
      this.name = "ProgramError";
    }
}

module.exports = ProgramError;