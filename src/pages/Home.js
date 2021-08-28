import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';
import memoizeOne from 'memoize-one';
import querySting from 'query-string';
import { getPhotosRequest } from '../store/actions/photos';

class Home extends Component {
  getPhotos = memoizeOne((query, page) => {
    clearTimeout(this.requestTimeout);
    this.requestTimeout = setTimeout(() => {
      this.props.getPhotosRequest(page, {
        ...query,
        query: query.search,
        search: undefined,
      });
    }, 400);
  }, _.isEqual);

  static propTypes = {
    getPhotosRequest: PropTypes.func.isRequired,
    photoList: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    photoListInfo: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentWillUnmount() {
    clearTimeout(this.requestTimeout);
  }

  handleChange = (ev) => {
    const { value } = ev.target;
    const query = querySting.parse(window.location.search);
    query.search = value;
    this.props.history.replace(`/page/1?${querySting.stringify(query)}`);
  };

  colorChange = (ev) => {
    const query = querySting.parse(window.location.search);
    query.color = ev.target.value !== 'all' ? ev.target.value : undefined;
    this.props.history.replace(`/page/1?${querySting.stringify(query)}`);
  }
  orientChange = (ev) => {
    const query = querySting.parse(window.location.search);
    query.orientation = ev.target.value !== 'all' ? ev.target.value : undefined;
    this.props.history.replace(`/page/1?${querySting.stringify(query)}`);
  }
  changeOrder = (ev) => {
    const query = querySting.parse(window.location.search);
    query.order_by = ev.target.value !== 'relevant' ? ev.target.value : undefined;
    this.props.history.replace(`/page/1?${querySting.stringify(query)}`);
  }
  changeContent = (ev) => {
    const query = querySting.parse(window.location.search);
    query.content_filter = ev.target.value !== 'relevant' ? ev.target.value : undefined;
    this.props.history.replace(`/page/1?${querySting.stringify(query)}`);
  }

  render() {
    const { page = 1 } = this.props.match.params;
    const query = querySting.parse(window.location.search);
    const { color, orientation, order_by, content_filter } = query
    const {
      photoList,
      photoListStatus,
      photoListInfo,
    } = this.props;
    this.getPhotos(query, page)
    return (
      <div>
        <h1>SEARCH PHOTOS</h1>
        <input className="inp"
          type="text"
          placeholder="search"
          value={query.search}
          onChange={this.handleChange}
        />
        {photoList.length>0 ? <>
        <label>COLORS</label>
        <select
          name="color"
          value={color || 'All'}
          id="color" onChange={this.colorChange}>
          <option value="all">All</option>
          <option value="black_and_white">Black and White</option>
          <option value="black">Black</option>
          <option value="yellow">Yellow</option>
          <option value="orange">Orange</option>
          <option value="red">Red</option>
          <option value="purple">Purple</option>
          <option value="magenta">Magenta</option>
          <option value="green">Green</option>
          <option value="teal">Teal</option>
          <option value="blue">Blue</option>
        </select>
        <label>ORENTATION</label>
        <select
          name="orientation"
          id="orientation"
          onChange={this.orientChange}>
          <option value="all">All</option>
          <option value="landscape">Landscape</option>
          <option value="portrait">Portrait</option>
          <option value="squarish">Squarish</option>
        </select>
        <label>ORDER BY</label>
        <select
          name="order_by"
          id="order_by"
          onChange={this.changeOrder}>

          <option value="relevant">Relevant</option>
          <option value="latest">Latest</option>
        </select>
        <label>CONTENT</label>
        <select
          name="content_filter"
          id="content_filter"
          onChange={this.changeContent}>
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>
        </>:""
        }

        <div className="photos-list">
          {photoList.map((p) => (
            <div key={p.id} className="item">
              <img src={p.urls.small} alt={p.alt_description} />
            </div>
          ))}
        </div>
   {photoList.length>0 ? <>
   <ReactPaginate 
          onPageChange={(p) => {
            this.props.history.push(`/page/${p.selected + 1}${window.location.search}`);
          }}
          containerClassName="pagination"
          forcePage={page - 1}
          pageCount={photoListInfo.total_pages}
        />
        <input className="page"
          type="number"
          value={page}
          min={1}
          max={photoListInfo.total_pages}
          onChange={(ev) => {
            this.props.history.push(`/page/${ev.target.value}${window.location.search}`);
          }} />
          </> :""}
        
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  photoList: state.photos.photoList,
  photoListStatus: state.photos.photoListStatus,
  photoListInfo: state.photos.photoListInfo,
});

const mapDispatchToProps = {
  getPhotosRequest,
};

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

export default Container;
