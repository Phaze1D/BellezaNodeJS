import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'

class BannerForm extends React.Component {
  render () {

    return (
      <div>
        <form className="flex-green-form">
          <div className="fu">
            <label>Activo</label>
            <input type="checkbox" defaultChecked={this.props.active}/>
          </div>

          <div className="lg">
            <label>Link To</label>
            <input type="text" name="link" className="input" defaultValue={this.props.link}/>
          </div>

          <div className="lg">
            <label>Start</label>
            <input type="date" name="start" className="input" defaultValue={this.props.start}/>
          </div>

          <div className="lg">
            <label>End</label>
            <input type="date" name="end" className="input" defaultValue={this.props.end}/>
          </div>

          <div className="lg">
            <label>Image</label>
            <input type="file" name="image"/>
          </div>

          <input type="submit" value="Save" className="submit"/>
          <Link className="cancel" to="/backoffice/banners/index">Cancel</Link>
        </form>
      </div>
    )
  }
}

export default BannerForm;
