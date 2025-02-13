import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../LogoSearch/LogoSearch'
import "../ProfileLeft/PorfileLeft.css"

const ProfileLeft = () => {
  return (
    <div className="ProfileSide">
        <LogoSearch location="profilePage"/>
        <InfoCard/>
        <FollowersCard/>
    </div>
  )
}

export default ProfileLeft