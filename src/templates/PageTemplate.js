import React from 'react';
import PropTypes from 'prop-types';
import { useLocalJsonForm } from 'gatsby-tinacms-json';
import shortid from 'shortid';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import useCustomPage from '../hooks/useCustomPage';

// Blocks
import { ContentSectionBlock } from '../components/CustomComponents/ContentSection';
import { HeadingSectionBlock } from '../components/CustomComponents/HeadingSection';
/**
TODO: LINK PARA PATREON E KOFI
TODO: i18n PT/EN OPTION</div>
TODO: SearchBlogPosts comum [DIGITA, PESQUISA POR QUERY NA URL ON CLICK ENTER OU CLICK GLASS MAGNIFIER] OU COM DATASET AI FAZ REALTIME...
TODO: TinaCMS testar
 */

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    customPagesJson(routePath: { eq: $slug }) {
      name
      routePath
      sections {
        title
        html
        bgBrightness
        columnOrder
        height
        text
        _template
      }

      rawJson
      fileRelativePath
    }
  }
`;

const FormOptions = {
  id: `page-${shortid.generate()}`,
  label: `Page Editing`,
  fields: [
    {
      label: 'Page Title',
      name: 'rawJson.name',
      description: 'Used into header and into site tab title.',
      component: 'text',
    },
    /* EDIT ROUTE?? MAYBE...NOT HERE... HERE: https://tinacms.org/docs/gatsby/creating-new-files
    {
      label: 'Page Route Path',
      name: 'rawJson.routePath',
      description: 'The route path used for this page.',
      component: 'text',
    },
    */
    {
      label: 'Page Sections',
      name: 'rawJson.sections',
      description: 'Edit the page sections with custom blocks.',
      component: 'blocks',
      templates: {
        ContentSection: ContentSectionBlock,
        HeadingSection: HeadingSectionBlock,
      },
    },
  ],
};

const PageTemplate = ({ data: { customPagesJson: pageContextData } }) => {
  const [pageContext] = useLocalJsonForm(pageContextData, FormOptions);
  const customPageData = useCustomPage(pageContext);
  const CustomPageProvider = customPageData.CustomComponentProvider;

  return (
    <CustomPageProvider pageContext={pageContext}>
      <Layout>
        <SEO title={pageContext.name} />
        {customPageData.customComponents}
      </Layout>
    </CustomPageProvider>
  );
};

PageTemplate.propTypes = {
  data: PropTypes.shape(() => ({
    name: PropTypes.string.isRequired,
    routePath: PropTypes.string.isRequired,
    sections: PropTypes.array,
  })),
};

export default PageTemplate;
