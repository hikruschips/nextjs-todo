import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithubAlt,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import React from "react";

function Footer() {
  return (
    <div className="flex justify-center items-center gap-5 py-3">
      {/* <a target="_blank">
        <FontAwesomeIcon
          className="duration-300 hover:opacity-30 cursor-pointer"
          icon={faInstagram}
        />
      </a>
      <a target="_blank">
        <FontAwesomeIcon
          className="duration-300 hover:opacity-30 cursor-pointer"
          icon={faLinkedin}
        />
      </a> */}
      <a target="_blank" href="https://github.com/hikruschips/nextjs-todo">
        <FontAwesomeIcon
          className="duration-300 hover:opacity-30 cursor-pointer"
          icon={faGithubAlt}
        />
      </a>
    </div>
  );
}

export default Footer;
