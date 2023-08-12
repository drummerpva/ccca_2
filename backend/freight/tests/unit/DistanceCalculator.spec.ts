import { describe, test, expect } from 'vitest'
import { Coord } from '../../src/domain/ValueObject/Coord'
import { DistanceCalculator } from '../../src/domain/service/DistanceCalculator'

describe('DistanceCalculator', () => {
  test('Shoul calculate distance between two coordinates', () => {
    const from = new Coord(-27.5911, -48.5614)
    const to = new Coord(-22.9675, -43.1866)
    const distance = DistanceCalculator.calculate(from, to)
    expect(distance).toBe(745.6636186812875)
  })
})
