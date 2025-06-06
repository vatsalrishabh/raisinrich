import React from 'react'
import CircularTitleBar from '../../components/CircularTitleBar'
import subscriptionImage from '../../public/images/subscription.png'
import JumpToBalKetoDetox from './JumpToBalKetoDetox'
import BalancedDiet from './BalancedDiet'
import KetoDiet from './KetoDiet'
import DetoxDiet from './DetoxDiet'


const index = () => {
  return (
    <div>
      <CircularTitleBar title="" subtitle="#SAMPLE FOOD MENU" image={subscriptionImage}/>
     <JumpToBalKetoDetox/>


     <BalancedDiet/>
     <KetoDiet/>
     <DetoxDiet/>
    
    </div>
  )
}

export default index
