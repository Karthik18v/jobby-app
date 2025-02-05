import {Component} from 'react'
import Cookies from 'js-cookie'
import {IoLocationSharp} from 'react-icons/io5'

import Header from '../Header'
import './index.css'

class Jobs extends Component {
  state = {
    profileData: null,
    jobList: [],
    employeeType: [],
    selectedSalaryRange: '10LPA',
    searchQuery: '', // Added state for search query
  }

  componentDidMount() {
    this.fetchData()
  }

  // Debounced method to handle employee type changes
  onChangeEmployee = event => {
    const {checked, value} = event.target
    this.setState(
      prevState => ({
        employeeType: checked
          ? [...prevState.employeeType, value]
          : prevState.employeeType.filter(each => each !== value),
      }),
      () => {
        this.getJobsDetails() // Fetch jobs based on the updated filter
      },
    )
  }

  getProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(apiUrl, options)
      if (!response.ok) {
        throw new Error('Failed to fetch profile data')
      }
      const data = await response.json()
      this.setState({profileData: data.profile_details})
    } catch (error) {
      console.error('Error fetching profile data:', error)
    }
  }

  getJobsDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {employeeType, selectedSalaryRange, searchQuery} = this.state
    const salaryMap = {
      '10LPA': '1000000',
      '20LPA': '2000000',
      '30LPA': '3000000',
      '40LPA': '4000000',
    }
    const requiredSalary = salaryMap[selectedSalaryRange] || '1000000'
    const employeeTypes = employeeType.length > 0 ? employeeType.join(',') : '' // Default to 'ALL' if empty

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeTypes}&minimum_package=${requiredSalary}&search=${searchQuery}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(apiUrl, options)
      if (!response.ok) {
        throw new Error('Failed to fetch Jobs data')
      }
      const data = await response.json()
      this.setState({jobList: data.jobs || []}) // Ensure jobList is always an array
    } catch (error) {
      console.error('Error fetching Jobs data:', error)
    }
  }

  handleSalaryRangeChange = e => {
    this.setState({selectedSalaryRange: e.target.value}, this.getJobsDetails)
  }

  handleSearchChange = e => {
    this.setState({searchQuery: e.target.value}, this.getJobsDetails)
  }

  fetchData = () => {
    this.getProfileData()
    this.getJobsDetails()
  }

  render() {
    const {
      profileData,
      jobList,
      employeeType,
      selectedSalaryRange,
      searchQuery,
    } = this.state
    console.log(jobList)

    return (
      <div className="job-main-container">
        <Header />
        <div className="job-container">
          <div className="profile-and-filters-container">
            {profileData ? (
              <div className="profile-container">
                <img
                  className="profile-img"
                  src={profileData.profile_image_url}
                  alt="profile"
                />
                <h1 className="profile-name">{profileData.name}</h1>
                <p className="profile-role">{profileData.short_bio}</p>
              </div>
            ) : (
              <p>Loading profile...</p>
            )}

            {/* Employment Type Filters */}
            <div className="employment-types">
              <h5>Employment Type</h5>
              {['FULLTIME', 'PARTTIME', 'FREELANCE', 'INTERNSHIP'].map(type => (
                <div key={type} className="employment-type">
                  <input
                    id={type.toLowerCase()}
                    type="checkbox"
                    value={type}
                    checked={employeeType.includes(type)}
                    onChange={this.onChangeEmployee}
                  />
                  <label htmlFor={type.toLowerCase()}>{type}</label>
                </div>
              ))}
            </div>

            {/* Salary Range Filters */}
            <div className="salary-range">
              <h3>Salary Range</h3>
              <label>
                <input
                  type="radio"
                  value="10LPA"
                  name="salaryRange"
                  checked={selectedSalaryRange === '10LPA'}
                  onChange={this.handleSalaryRangeChange}
                />
                10 LPA and above
              </label>
              <label>
                <input
                  type="radio"
                  value="20LPA"
                  name="salaryRange"
                  checked={selectedSalaryRange === '20LPA'}
                  onChange={this.handleSalaryRangeChange}
                />
                20 LPA and above
              </label>
              <label>
                <input
                  type="radio"
                  value="30LPA"
                  name="salaryRange"
                  checked={selectedSalaryRange === '30LPA'}
                  onChange={this.handleSalaryRangeChange}
                />
                30 LPA and above
              </label>
              <label>
                <input
                  type="radio"
                  value="40LPA"
                  name="salaryRange"
                  checked={selectedSalaryRange === '40LPA'}
                  onChange={this.handleSalaryRangeChange}
                />
                40 LPA and above
              </label>
            </div>
          </div>
          <div className="jobs-list-container">
            <input
              type="search"
              placeholder="search"
              onChange={this.handleSearchChange}
              className="job-search"
              value={searchQuery}
            />
            <ul className="jobs">
              {jobList.map(job => (
                <li key={job.id}>
                  <div className="job-card">
                    <div className="job-heading">
                      <img
                        className="job-card-logo"
                        src={job.company_logo_url}
                        alt="company logo"
                      />
                      <div className="job-card-title-rating">
                        <p className="job-card-title">{job.title}</p>
                        <p className="job-card-rating">&#9733; {job.rating}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="job-type-desc">
                      <div className="job-type-location-type">
                        <p>{job.location}</p>
                        <p>{job.employment_type}</p>
                      </div>
                      <p>{job.package_per_annum}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
