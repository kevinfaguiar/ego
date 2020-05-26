import React, { memo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Hero from '../../Hero';
import { getSingleMarkdownNode } from '../../../utils/graphql-utils';
import {
  StyledColumn,
  StyledHeader,
  StyledContent,
  StyledFlexReverse,
} from '../../Layout/global-styles';

const rootQuery = graphql`
  query {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/(onepage)/" }
        frontmatter: { id: { eq: "055f6de2-5aa1-4fb4-8a26-8d407f1159aa" } }
      }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            id
            title
            date
          }
          html
        }
      }
    }
  }
`;

function TechstackSection() {
  const data = useStaticQuery(rootQuery);
  const { frontmatter, html } = getSingleMarkdownNode(data);
  const { id, title } = frontmatter;

  return (
    <Hero bgColor="primary" id="techstack">
      <StyledFlexReverse>
        <StyledColumn>
          <StyledHeader>{title}</StyledHeader>
        </StyledColumn>
        <StyledColumn>
          <StyledContent dangerouslySetInnerHTML={{ __html: html }} />
        </StyledColumn>
      </StyledFlexReverse>
    </Hero>
  );
}

export default memo(TechstackSection);