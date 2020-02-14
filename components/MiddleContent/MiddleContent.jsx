import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router'; // next 为啥要接管 路由 呢
import { connect } from 'react-redux'; // 为啥
import { isEmpty, map } from 'lodash/fp';
import Modal from 'react-responsive-modal'; // 遮罩层直接用!
import { Card, DetailsCard } from './Card';
import CardPlaceholder from './CardPlaceholder';
import { contentActions, globalActions } from '../../actions';
import { Button, Footer, CopyrightText } from '../styles';
import {
  MiddleContentWrapper,
  Content,
  PageActions,
} from './MiddleContent.styles';

const MAX_ITEM_COUNT = 25;

class MiddleContent extends React.Component { 
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.posts,
      itemModalOpen: false,
      currentModalItem: null,
      previousPath: '/',
    };
  }

  componentDidMount = () => {
    const { fnfetchKKTT, fnfetchSubKT, global: { pageParams } } = this.props;

    if (pageParams.subredditName) {
      fnfetchSubKT({
        sub: pageParams.subredditName,
      });
    } else {
      fnfetchKKTT();
    }
  }

  // componentWillReceiveProps
  shouldComponentUpdate = (nextProps) => {
    if (this.props.posts !== nextProps.posts) {
      this.setState(prevState => ({
        ...prevState,
        ...nextProps.posts,
      }));
      return true;
    }
    return true;
  }
  
  onOpenModal = (currentItem) => {
    const { router } = this.props;

    const prevPath = router.asPath;

    this.props.fnSetModalItem(currentItem);

    this.setState(prevState => ({
      ...prevState,
      previousPath: prevPath,
      itemModalOpen: true,
      currentModalItem: currentItem,
    }), this.props.fnSetRouterPath({
      prevPath, 
    }));    
  };

  onCloseModal = () => {
    const { router, global: { router: { prevPath } } } = this.props;
    this.setState({
      itemModalOpen: false,
      currentModalItem: null,
    });

    this.props.fnSetModalItem(null);

    router.replace(`/?${prevPath}`, prevPath, { shallow: true });
  };

  onLoadMoreItems = () => {
    const { posts: { sort, after }, global: { pageParams } } = this.props;
    const params = {
      sort,
      after,
    };
    if (pageParams.subredditName) {
      this.props.fnloadMoreSubKTItems({ ...params, sub: pageParams.subredditName });
    } else {
      this.props.fnloadMoreKTItems();
    }
  }

  render () {
    const { fetching } = this.state;
    const { posts, global: { pageParams } } = this.props;
    // const finalItems = take(MAX_ITEM_COUNT, items);
    const finalItems = posts.allPosts;
    return (
      <MiddleContentWrapper>
        <Content>
          { fetching || isEmpty(finalItems)
            ? <CardPlaceholder count={MAX_ITEM_COUNT} />
            : finalItems.length > 0 && finalItems.map((name, ii) => (
              <Card key={ii} item={posts.model[name]} onOpenModal={this.onOpenModal} onCloseModal={this.onCloseModal} onExpand={this.props.fnExpandItem}/>
            ))
          }
        </Content>
        <PageActions>
          <Button width={174} onClick={this.onLoadMoreItems}>Load More</Button>
        </PageActions>
        <Footer>
          <CopyrightText>
          Use of this site constitutes acceptance of our User Agreement and Privacy Policy. 
          <br />© 2020 KuKuTiTi Inc. All rights reserved.
          </CopyrightText>
        </Footer>
        <Modal
          open={this.state.itemModalOpen}
          onClose={this.onCloseModal}
          center
          styles={{
            modal: { minWidth: '800px', minHeight: '90%'}
          }}
        >
          <DetailsCard />
        </Modal>
      </MiddleContentWrapper>
    );
  }
}

MiddleContent.propTypes = {
  fnfetchKKTT: PropTypes.func,
  fnloadMoreKTItems: PropTypes.func,
  fnfetchSubKT: PropTypes.func,
  fnloadMoreSubKTItems: PropTypes.func,
  fnExpandItem: PropTypes.func,
  fnSetModalItem: PropTypes.func,
  fnSetRouterPath: PropTypes.func,
};

MiddleContent.defaultProps = {
  fnfetchKKTT: () => {},
  fnloadMoreKTItems: () => {},
  fnfetchSubKT: () => {},
  fnloadMoreSubKTItems: () => {},
  fnExpandItem: () => {},
  fnSetModalItem: () => {},
  fnSetRouterPath: () => {},
};

const mapStateToProps = (state) => ({
  global: state.global,
  posts: state.posts,
  currentModalItem: state.currentModalItem,
});

const mapDispatchToProps = (dispatch) => ({
  fnfetchKKTT: params => dispatch(contentActions.fetchKKTT(params)),
  fnloadMoreKTItems: params => dispatch(contentActions.loadMoreKTItems(params)),
  fnfetchSubKT: params => dispatch(contentActions.fetchSubKT(params)),
  fnloadMoreSubKTItems: params => dispatch(contentActions.loadMoreSubKTItems(params)),
  fnExpandItem: (item) => dispatch(contentActions.expandItem(item)), 
  fnSetModalItem: (item) => dispatch(contentActions.setModalContentItem(item)), 
  fnSetRouterPath: (params) => dispatch(globalActions.setRouterPath(params)), 
})

const MiddleContentWithRouter = withRouter(MiddleContent);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiddleContentWithRouter);
