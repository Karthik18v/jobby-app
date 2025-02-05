import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {IoLocation} from 'react-icons/io5'
import {FaSuitcaseRolling, FaExternalLinkAlt} from 'react-icons/fa'
import Header from '../Header'

import './index.css'

class SpecificJobs extends Component {
  state = {
    jobData: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {jobId} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${jobId}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    this.setState({jobData: data.job_details, similarJobs: data.similar_jobs})
  }

  render() {
    const {jobData, similarJobs} = this.state
    console.log(similarJobs)
    const {skills} = jobData
    console.log(jobData)

    return (
      <div className="specific-job-container">
        <Header />
        <div className="specific-job-card">
          <div className="job-heading">
            <img
              className="job-card-logo"
              src={jobData.company_logo_url}
              alt="company logo"
            />
            <div className="job-card-title-rating">
              <p className="job-card-title">{jobData.title}</p>
              <p className="job-card-rating">&#9733; {jobData.rating}</p>
            </div>
          </div>
          <div className="job-type-desc">
            <div className="job-type-location-type">
              <p>
                <IoLocation />
                {jobData.location}
              </p>
              <p>
                <FaSuitcaseRolling />
                {jobData.employment_type}
              </p>
            </div>
            <p>{jobData.package_per_annum}</p>
          </div>
          <hr />
          <div className="specific-job-description-heading">
            <strong>Description</strong>
            <Link to={jobData.company_website_url} style={{color: ' #b6c5ff'}}>
              <strong>
                Visit
                <FaExternalLinkAlt />
              </strong>
            </Link>
          </div>
          <p>{jobData.job_description}</p>
          <strong>Skills</strong>
          {skills && (
            <ul className="skills-container">
              {skills.map(each => (
                <li key={each.name}>
                  <div className="skill-item">
                    <img src={each.image_url} alt={each.name} />
                    <p>{each.name}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <h1>Life at Company</h1>
          <div className="about-company-culture">
            <p>{jobData.life_at_company?.description}</p>
            <img src={jobData.life_at_company?.image_url} alt="company logo" />
          </div>
          <h1>Similar Jobs</h1>
          <ul>
            {similarJobs.map(each => (
              <li>Hello</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SpecificJobs
