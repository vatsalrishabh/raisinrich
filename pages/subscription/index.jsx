import React from "react";
import CircularTitleBar from "../../components/CircularTitleBar";
import SubscriptionForm from "../../components/subscription/SubscriptionForm";
import subscription from "../../public/images/subscription.png";


const Index = () => {
  return (
    <div>
        <CircularTitleBar image={subscription} subtitle="Let’s create a new you!" title="Subscribe Now"/>
        <SubscriptionForm/>
    </div>
  );
};

export default Index;
