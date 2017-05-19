import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'

class BannerForm extends React.Component {
  render () {
    const {
      banner,
      errors,
      onRequestSubmit
    } = this.props

    return (
        <form className="main-form grid-wrap" onSubmit={onRequestSubmit}>

          <div className="col-12">
            <label>Activo</label>
            {errors.get('active') && <div className="error-div">{errors.get('active')}</div>}
            <input type="checkbox" defaultChecked={banner.get('active')} name="active"/>
          </div>


          <div className="col-3">
            <label>Start</label>
            {errors.get('start') && <div className="error-div">{errors.get('start')}</div>}
            <input type="date" name="start" defaultValue={banner.get('start')}/>
          </div>


          <div className="col-3">
            <label>End</label>
            {errors.get('end') && <div className="error-div">{errors.get('end')}</div>}
            <input type="date" name="end" defaultValue={banner.get('end')}/>
          </div>


          <div className="col-3">
            <label>Image</label>
            {errors.get('image') && <div className="error-div">{errors.get('image')}</div>}
            <input type="file" name="image"/>
          </div>


          <div className="col-3">
            <label>Link To</label>
            {errors.get('link') && <div className="error-div">{errors.get('link')}</div>}
            <input type="text" name="link" defaultValue={banner.get('link')}/>
          </div>


          <input className="submit full" type="submit" value="Save"/>
          <Link className="cancel full" to="/backoffice/banners">Cancel</Link>
        </form>
    )
  }
}

export default BannerForm;
