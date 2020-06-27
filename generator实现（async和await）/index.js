const asyncFunc = (generatorFunc) => {
	const gen = generatorFunc()
	
	return new Promise((resolve, reject) => {
		function step(key, args) {
			try {
				const { value, done } = gen[key](args)

				if (done) {
					resolve(value)
				} else {
					return value.then(val => {
						step('next', val)
					}, reason => {
						step('throw', reason)
					})
				}
			} catch (error) {
				reject(error)				
			}
		}

		step('next')
	})
}