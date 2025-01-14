module.exports = {
  moduleNameMapper: {
    '^react-konva$': '<rootDir>/src/__mocks__/react-konva.tsx'
  },
  setupFiles: ['jest-canvas-mock']
}
