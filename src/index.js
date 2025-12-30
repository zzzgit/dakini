import path from 'node:path'
import os from 'node:os'
import { mkdir, readFile } from 'node:fs/promises'

const homeDir = os.homedir()
const platform = os.platform()

const getQandR = (dividend, divisor)=> {
	const remainder = dividend % divisor
	const quotient = (dividend - remainder) / divisor
	return [quotient, remainder]
}

/**
 * Get the formatted time range in days, hours, minutes, and seconds
 * @param {*} range the time range in seconds
 * @returns 
 */
const formatTimeRange = (range)=> {
	const delta = Math.max(+range * 1000, 0)
	let temp = getQandR(delta, 1000 * 60 * 60 * 24)
	const days = Math.floor(temp[0])
	temp = getQandR(temp[1], 1000 * 60 * 60)
	const hours = Math.floor(temp[0])
	temp = getQandR(temp[1], 1000 * 60)
	const minutes = Math.floor(temp[0])
	temp = getQandR(temp[1], 1000)
	const seconds = Math.floor(temp[0])
	const result = {}
	if (days){
		result.days = days
		if (hours){
			result.hours = hours
		}
		return result
	}
	if (hours){
		result.hours = hours
		if (minutes){
			result.minutes = minutes
		}
		return result
	}
	if (minutes){
		result.minutes = minutes
		if (seconds){
			result.seconds = seconds
		}
		return result
	}
	result.seconds = seconds
	return result
}

/**
 * Ensure the given path exists, creating the directories if necessary
 * @param {*} dir the path to ensure
 * @returns a promise that resolves when the path is ensured
 */
const ensureDir = (dir)=> {
	return mkdir(dir, { recursive: true })
}

/**
 * Get a random boolean value which is true with 50% probability
 * @returns a boolean value
 */
const flipCoin = ()=> {
	return !!(random(1000) % 2)
}

const _getXDGConfigHomeLinux = ()=> {
	const xdgConfigHome = process.env.XDG_CONFIG_HOME
	if (xdgConfigHome && xdgConfigHome.trim()){
		return xdgConfigHome
	}
	return path.join(homeDir, '.config')
}

const _getXDGConfigHomeMac = ()=> {
	const xdgConfigHome = process.env.XDG_CONFIG_HOME
	if (xdgConfigHome && xdgConfigHome.trim()){
		return xdgConfigHome
	}
	return path.join(homeDir, 'Library', 'Application Support')
}

const _getAppDataDirWin = ()=> {
	return process.env.APPDATA
}

const _getXDGDataHomeLinux = ()=> {
	const xdgDataHome = process.env.XDG_DATA_HOME
	if (xdgDataHome && xdgDataHome.trim()){
		return xdgDataHome
	}
	return path.join(homeDir, '.local', 'share')
}

const _getXDGDataHomeMac = ()=> {
	const xdgDataHome = process.env.XDG_DATA_HOME
	if (xdgDataHome && xdgDataHome.trim()){
		return xdgDataHome
	}
	return path.join(homeDir, 'Library', 'Application Support')
}

const _getLocalAppDataDirWin = ()=> {
	return process.env.LOCALAPPDATA
}

const _getCacheDirLinux = ()=> {
	const xdgCacheHome = process.env.XDG_CACHE_HOME
	if (xdgCacheHome && xdgCacheHome.trim()){
		return xdgCacheHome
	}
	return path.join(homeDir, '.cache')
}

const _getCacheDirMac = ()=> {
	return path.join(homeDir, 'Library', 'Caches')
}

const _getCacheDirWin = ()=> {
	// TEMP
	return path.join(_getLocalAppDataDirWin(), 'Cache')
}

const _getStateDirLinux = ()=> {
	const xdgStateHome = process.env.XDG_STATE_HOME
	if (xdgStateHome && xdgStateHome.trim()){
		return xdgStateHome
	}
	return path.join(homeDir, '.local', 'state')
}

const _getStateDirMac = ()=> {
	return path.join(homeDir, 'Library', 'Application Support')
}

const _getStateDirWin = ()=> {
	return _getLocalAppDataDirWin()
}

const getCacheDir = (app)=> {
	if (platform === 'win32'){
		return path.join(_getCacheDirWin(), app)
	}
	if (platform === 'darwin'){
		return path.join(_getCacheDirMac(), app)
	}
	return path.join(_getCacheDirLinux(), app)
}

const getStateDir = (app)=> {
	if (platform === 'win32'){
		return path.join(_getStateDirWin(), app)
	}
	if (platform === 'darwin'){
		return path.join(_getStateDirMac(), app)
	}
	return path.join(_getStateDirLinux(), app)
}

const getConfigDir = (app)=> {
	if (platform === 'win32'){
		return path.join(_getAppDataDirWin(), app)
	}
	if (platform === 'darwin'){
		return path.join(_getXDGConfigHomeMac(), app)
	}
	return path.join(_getXDGConfigHomeLinux(), app)
}

const getDataDir = (app)=> {
	if (platform === 'win32'){
		return path.join(_getLocalAppDataDirWin(), app)
	}
	if (platform === 'darwin'){
		return path.join(_getXDGDataHomeMac(), app)
	}
	return path.join(_getXDGDataHomeLinux(), app)
}

/**
 * Read the content of a file 
 * @param {*} file 
 * @returns a promise that resolves with the content of the file
 */
const readFromFile = (file)=> {
	return ensureDir(path.resolve(file, '../')).then(()=> {
		return readFile(file, 'utf8')
	})
}

/**
 * Get a random number within a given range, either floating point or integer. The range is from 0(inclusive) to n(exclusive).
 * @param {*} n the upper bound of the random number, exclusive
 * @param {*} isFloating whether the random number should be a floating point number. Default is false
 * @returns the random number
 */
const random = (n, isFloating = false)=> {
	if(typeof n !== 'number'){
		throw new Error('n must be a number!')
	}
	if (n <= 0){
		return 0
	}
	const raw = Math.random() * n
	if (isFloating){
		return raw
	}
	return Math.trunc(raw)
}

/**
 * Get a random number within a given range, either floating point or integer. The range is from min(inclusive) to max(exclusive).
 * @param {*} min the lower bound of the random number, inclusive
 * @param {*} max the upper bound of the random number, exclusive
 * @param {*} isFloating whether the random number should be a floating point number. Default is false
 * @returns the random number
 */
const range = (min, max, isFloating = false)=> {
	if(typeof min !== 'number' || typeof max !== 'number'){
		throw new Error('min and max must be numbers!')
	}
	if (!isFloating){
		min = Math.floor(min)
		max = Math.floor(max)
	}
	const delta = max - min
	if (delta < 0){
		throw new Error('max must be greater than min!')
	}
	if (delta === 0){
		return min
	}
	const result = min + random(delta, isFloating)
	return result
}

/**
 * Shuffle an array in place
 * @param {*} arr the array to shuffle
 */
const shuffle = (arr)=> {
	if(!Array.isArray(arr)){
		throw new Error('arr must be an array!')
	}
	const n = arr.length
	for (let i = 0, len = arr.length - 1; i < len; i++){
		const t = i + random(n - i - 1, false) + 1
		const temp = arr[i]
		arr[i] = arr[t]
		arr[t] = temp
	}
}

/**
 * Get the factorial of a number
 * @param {*} num the number to get the factorial of
 * @returns a number
 */
const factorial = (num)=> {
	if(typeof num !== 'number'){
		throw new Error('num must be a number!')
	}
	let result = num
	if (num < 0){
		return -1
	}
	if (num === 0 || num === 1){
		return 1
	}
	while (num > 1){
		num--
		result *= num
	}
	return result
}

/**
 * Get a counter function that returns the number of times it has been called. The times start from 1.
 * @returns a counter function
 */
const getCounter = ()=> {
	let times = 0
	return function(){
		times += 1
		return times
	}
}

/**
 * Get a random boolean value based on the probability calculated by (chance / range). The chance must be between 0 and range.
 * @param {*} chance integer number between 0 and range
 * @param {*} range integer number
 * @returns a boolean value
 */
const chance = (chance, range)=> {
	if(typeof chance !== 'number' || typeof range !== 'number'){
		throw new Error('chance and range must be integer numbers!')
	}
	if (chance < 0 || chance > range){
		throw new Error('chance must be between 0 and range!')
	}
	const randomN = random(range, false)
	return randomN < chance
}

/**
 * Sleep for a given number of milliseconds
 * @param {*} milliseconds how long to wait in milliseconds
 * @returns a promise that resolves after the given number of milliseconds
 */
const sleep = (milliseconds)=> {
	if(typeof milliseconds !== 'number'){
		throw new Error('milliseconds must be a number')
	}
	return new Promise((resolve)=> {
		setTimeout(()=> {
			resolve(true)
		}, milliseconds)
	})
}

/**
 * Get the username of the current user, based on the platform
 * @returns the username of the current user
 */
const getUsername = ()=> {
	try {
		const userInfo = os.userInfo()
		return userInfo.username
	} catch (error){
		console.error('Error getting username via os.userInfo():', error)
		switch (process.platform){
		case 'win32':
			return process.env.USERNAME || process.env.USERPROFILE?.split('\\').pop() || 'Unknown User'
		case 'darwin':
		case 'linux':
			return process.env.USER || process.env.LOGNAME || 'Unknown User'
		default:
			return 'Unknown User'
		}
	}
}

export {
	formatTimeRange,
	readFromFile,
	random,
	range,
	shuffle,
	ensureDir,
	flipCoin,
	factorial,
	getCounter,
	chance,
	sleep,
	getUsername,
	getConfigDir,
	getDataDir,
	getStateDir,
	getCacheDir,
}
