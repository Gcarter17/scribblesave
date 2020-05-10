import React from "react";
import Contacts from "../contacts/Contacts";
import ContactFilter from "../contacts/ContactFilter";
import Mode from "../layout/Modal";
// import { Builder, By, Key, util } from 'selenium-webdriver'

const Home = () => {
  // async function example() {
  //   let driver = await new Builder().forBrowser('firefox').build();
  //   await driver.get('http://google.com')
  //   await driver.findElement(By.name('q')).sendKeys('Selenium', Key.RETURN)
  // }

  return (
    // <div className="grid-2">
    <div>
      {/* <button onClick={example()}>Press here</button> */}
      <Mode />
      <div className="form-group">
        <ContactFilter />
      </div>
      <div>
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
