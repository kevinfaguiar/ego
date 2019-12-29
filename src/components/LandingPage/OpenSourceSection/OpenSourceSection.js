import React, { memo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Hero from '../../Hero';
import {
  StyledHeader,
  StyledProjectColumn,
  StyledProjectTitle,
  StyledContent,
} from './styles';
import { getSingleImageFixed } from '../../../utils/graphql-utils';
import { StyledRow } from '../../Layout/global-styles';
import LazyImage from '../../LazyImage';

const rootQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(markdown-onepage)/" }
        frontmatter: { type: { eq: "open-source" } }
      }
      sort: { order: ASC, fields: [frontmatter___id] }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            id
            type
            date
            projectTitle
            projectPreviewImg {
              childImageSharp {
                fixed(
                  width: 250
                  height: 250
                  quality: 100
                  cropFocus: CENTER
                ) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            projectUrl
          }
          html
        }
      }
    }
  }
`;

function OpenSourceSection() {
  const data = useStaticQuery(rootQuery);

  return (
    <Hero bgColor="primary" id="open-source">
      <StyledRow>
        <StyledHeader>Open Source</StyledHeader>
      </StyledRow>
      <StyledRow style={{ margin: '30px 0' }}>
        {data.allMarkdownRemark.edges.map((el, index) => {
          const { frontmatter, html } = el.node;
          const { projectTitle, projectPreviewImg, projectUrl } = frontmatter;
          return (
            <StyledProjectColumn key={index}>
              <StyledRow>
                <a
                  href={projectUrl}
                  title={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-img-link"
                >
                  <LazyImage
                    imageFixed={getSingleImageFixed(projectPreviewImg)}
                    style={{
                      borderRadius: '15px',
                      margin: 'auto',
                    }}
                  />
                </a>
              </StyledRow>
              <StyledRow style={{ marginTop: '15px' }}>
                <StyledProjectTitle>{projectTitle}</StyledProjectTitle>
              </StyledRow>
              <StyledRow>
                <StyledContent
                  dangerouslySetInnerHTML={{
                    __html: html,
                  }}
                />
              </StyledRow>
            </StyledProjectColumn>
          );
        })}
      </StyledRow>
    </Hero>
  );
}

export default memo(OpenSourceSection);
