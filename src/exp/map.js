import Base from 'base'

export default class Map extends Base {

  constructor() {
    super()
  }

  // override
  getData() {
    super.data = [1,2,67,3,4,5,8,66]
  }

  // override
  init() {

  }
}
