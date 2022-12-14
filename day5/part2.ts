import fs from 'fs'

/**
 * Crate input stored as an array
 * 1st character = bottom of stack
 * Last character = top of stack
 *
 * Input:
 * [Q]         [N]             [N]
 * [H]     [B] [D]             [S] [M]
 * [C]     [Q] [J]         [V] [Q] [D]
 * [T]     [S] [Z] [F]     [J] [J] [W]
 * [N] [G] [T] [S] [V]     [B] [C] [C]
 * [S] [B] [R] [W] [D] [J] [Q] [R] [Q]
 * [V] [D] [W] [G] [P] [W] [N] [T] [S]
 * [B] [W] [F] [L] [M] [F] [L] [G] [J]
 *  1   2   3   4   5   6   7   8   9
 */
export const initialCrates = [
  'BVSNTCHQ',
  'WDBG',
  'FWRTSQB',
  'LBWSZJDN',
  'MPDVF',
  'FWJ',
  'LNQBJV',
  'GTRCJQSN',
  'JSQCWDM',
]

type Instruction = {
  move: number
  from: number
  to: number
}

function start() {
  const instructions = fs
    .readFileSync('input.txt', 'utf-8')
    .split(/\r?\n/)
    // Splits string into object of instructions
    .map<Instruction>((line) => {
      const [move, from, to] = line
        // remove all text, leaving only a comma separated list of numbers
        .replace('move ', '')
        .replace(' from ', ',')
        .replace(' to ', ',')
        // split at commas to get move, from, to
        .split(',')

      return {
        move: Number(move),
        from: Number(from),
        to: Number(to),
      }
    })

  let crates = [...initialCrates]

  instructions.forEach(({ move, to, from }) => {
    let fromStack = crates[from - 1]
    let toStack = crates[to - 1]

    // Which crate to start grabbing from
    const startIndex = fromStack.length - move
    // Grab the required number of crates from the top of the stack
    const cratesToMove = fromStack.substring(startIndex, fromStack.length)

    // Remove the required number of crates from the stack
    fromStack = fromStack.substring(0, startIndex)
    // Add removed crates to top of the new stack
    toStack = `${toStack}${cratesToMove}`

    // Update the crates array with the new info
    crates[from - 1] = fromStack
    crates[to - 1] = toStack
  })

  const answer = crates.reduce((acc, stack) => {
    const topCrate = stack[stack.length - 1]
    return `${acc}${topCrate}`
  }, '')

  console.info(`The crates on top of each stack are: ${answer}`)
}

start()
