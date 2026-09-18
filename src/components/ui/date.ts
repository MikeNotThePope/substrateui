// The date picker's own entry point. It is not in the root barrel on purpose:
// `Calendar` drags in react-day-picker and every file of date-fns, and a root
// barrel that re-exports it makes `import { Button }` load all of that too.
// Measured on a consumer: 1549 modules on a root import against 188 on the
// subpaths, and a DOM test file that took 5.3s to start instead of 1.1s
// (MikeNotThePope/substrateui#122). Every other atom stays at the root; the
// picker is the one whose dependency is bigger than the rest of the library.
export * from "./calendar"
export * from "./date-picker"
