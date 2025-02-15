import * as chai from 'chai'
import { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import {
	chance,
	factorial,
	flipCoin,
	formatTimeRange,
	getConfigDir,
	getCounter,
	getDataDir,
	getUsername,
	random,
	range,
	readFromFile,
	shuffle,
	sleep,
} from '../src/index.js'

chai.use(chaiAsPromised)

describe('Utility Functions', function(){
	it('should format time range correctly', function(){
		expect(formatTimeRange(3600)).to.deep.equal({ hours: 1 })
		expect(formatTimeRange(86400)).to.deep.equal({ days: 1 })
	})

	it('should read from file', async function(){
		const filePath = new URL('../package.json', import.meta.url).pathname
		await expect(readFromFile(filePath)).to.eventually.be.a('string')
	})

	it('should generate random numbers', function(){
		expect(random(10)).to.be.within(0, 9)
		expect(random(10, true)).to.be.within(0, 10)
	})

	it('should generate random numbers within a range', function(){
		expect(range(5, 10)).to.be.within(5, 9)
		expect(range(5, 10, true)).to.be.within(5, 10)
	})

	it('should shuffle an array', function(){
		const arr = [1, 2, 3, 4, 5]
		shuffle(arr)
		expect(arr).to.have.members([1, 2, 3, 4, 5])
	})

	it('should flip a coin', function(){
		expect(flipCoin()).to.be.a('boolean')
	})

	it('should calculate factorial', function(){
		expect(factorial(5)).to.equal(120)
	})

	it('should get a counter function', function(){
		const counter = getCounter()
		expect(counter()).to.equal(1)
		expect(counter()).to.equal(2)
	})

	it('should return a boolean based on chance', function(){
		expect(chance(1, 2)).to.be.a('boolean')
	})

	it('should sleep for a given time', async function(){
		const start = Date.now()
		await sleep(1000)
		const end = Date.now()
		expect(end - start).to.be.at.least(1000)
	})

	it('should get data directory', function(){
		expect(getDataDir('myApp')).to.be.a('string')
	})

	it('should get username', function(){
		expect(getUsername()).to.be.a('string')
	})

	it('should get config directory', function(){
		expect(getConfigDir('myApp')).to.be.a('string')
	})
})
