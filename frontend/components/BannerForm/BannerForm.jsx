import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'

class BannerForm extends React.Component {
  render () {

    return (
        <form className="main-form grid-wrap">

          <div className="col-12">
            <label>Activo</label>
            <input type="checkbox" defaultChecked={this.props.active}/>
          </div>


          <div className="col-3">
            <label>Start</label>
            <input type="date" name="start" defaultValue={this.props.start}/>
          </div>


          <div className="col-3">
            <label>End</label>
            <input type="date" name="end" defaultValue={this.props.end}/>
          </div>


          <div className="col-3">
            <label>Image</label>
            <input type="file" name="image"/>
          </div>


          <div className="col-3">
            <label>Link To</label>
            <input type="text" name="link" defaultValue={this.props.link}/>
          </div>


          <input className="submit full" type="submit" value="Save"/>
          <Link className="cancel full" to="/backoffice/banners/index">Cancel</Link>
        </form>
    )
  }
}

export default BannerForm;
