import React, { useEffect, useReducer, useMemo } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import CustomComponents from '../components/CustomComponents';
import HeadingSection from '../components/CustomComponents/HeadingSection';
import {
  customPageReducer,
  initialCustomPageState,
  CustomPageContext,
} from '../reducers/custom-page';

// TODO: Better responsiveness when TinaCMS sidebar is open
// TODO: Better block component for Tina showing name or preview in listing
// TODO: Editable Menu
// TODO: Create pages on demand
// TODO: Blog post editor
// TODO: Create blog pages on demand too
// TODO: Put emoji parser in every text present
// TODO: New List component with different placeholder
// TODO: New image custom component TinaCMS (Check if new release fixes)
// TODO: TinaCMS dark theme accordingly page theme
// TODO: Curriculum Vitae Page Component generation on build
// TODO: FIX Hidden menu button
// TODO: New Blog
// TODO: Search in Blog
// TODO: Tests (maybe?)
const CustomComponentProvider = ({ children, pageContext, formObj }) => {
  const [state, dispatch] = useReducer(
    customPageReducer,
    initialCustomPageState
  );

  useEffect(() => {
    dispatch({
      type: 'SET_PAGE_CONTEXT',
      pageContext,
    });
  }, [pageContext]);

  useEffect(() => {
    dispatch({
      type: 'SET_FORM_OBJ',
      formObj,
    });
  }, [formObj]);

  return (
    <CustomPageContext.Provider value={[state, dispatch]}>
      {children}
    </CustomPageContext.Provider>
  );
};

CustomComponentProvider.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.object.isRequired,
  formObj: PropTypes.object.isRequired,
};

const useCustomPage = (data, formObj) => {
  const customComponents = useMemo(
    () =>
      (data.sections ?? []).map(sectionData => {
        const CustomComponent = CustomComponents[sectionData._template];
        // eslint-disable-next-line
        return CustomComponent ? <CustomComponent {...sectionData} formObj={formObj} key={shortid.generate()} id={`custom-component-${shortid.generate()}`} /> : (<HeadingSection height="auto" text={`An error has ocurred! Could not load Custom Component: ${sectionData._template}`}/>
        );
      }),
    [data?.sections]
  );

  return {
    customComponents,
    CustomComponentProvider,
  };
};

export default useCustomPage;
