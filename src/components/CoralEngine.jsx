import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import ReactPlayer from 'react-player';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  descriptionTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'center',
    fontSize: '1.5em',
    fontWeight: 500,
  },
  section: {
    marginTop: 50,
  },
  sectionTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    justifyContent: 'center',
    display: 'flex',
  },
  sectionHeader: {
    fontWeight: 500,
    fontSize: '1.5em',
  },
  sectionText: {
    fontSize: '1.2em',
    marginTop: 15,
  },
  sectionImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  playerWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
};

function CoralEngine(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.coral_engine, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          <div style={styles.descriptionTextContainer}>
            {parseIntro(data?.description)}
          </div>
          {data?.videoSource && (
            <div className="playerWrapper">
              <ReactPlayer
                url={data?.videoSource}
                className="react-player"
                width="100%"
                playing
                muted
                controls
                loop
              />
            </div>
          )}
          {data?.sections
            ? (
              <Fade>
                {data.sections?.slice(0, data.sections.length).map((section) => (
                  <Row style={styles.section}>
                    <Col style={styles.sectionTextContainer}>
                      <div style={styles.sectionHeader}>
                        {section.header}
                      </div>
                      <div style={styles.sectionText}>
                        {parseIntro(section.about)}
                      </div>

                    </Col>
                    <Col style={styles.sectionImageContainer}>
                      {section.imageSource ? (
                        <img src={section.imageSource} alt="showcase" />
                      ) : <ReactPlayer url={section.videoSource} className="react-player" playing muted controls loop />}
                    </Col>
                  </Row>
                ))}
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

CoralEngine.propTypes = {
  header: PropTypes.string.isRequired,
};

export default CoralEngine;
