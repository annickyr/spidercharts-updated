import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import styled from '@emotion/styled';
import PropTypes from 'prop-types'

const Ring = styled.div`
  position:absolute;
	top:50%;
	left:50%;
	transform:translate(-50%, -50%);
	border-radius:50%;
	border:1px solid #fff;
`
const Line = styled.div`
  height:.5px;
  background-color:rgba(255,255,255,70);
  position:absolute;
  top:50%;
  left:50%;
  transform-origin:top left;
  z-index:0;
`
const TagsWrapper = styled.div`
  position:absolute;
  transform-origin:center;
  transform:translate(-50%, -50%);
  top:50%;
  left:50%;
  z-index:400;
`

const Tag = styled.div`
  position:relative;
  transform-origin:center;
  font-family:Helvetica;
  color: #777;
  font-size: 80%;
  font-weight:bold;
  width:80px;
  z-index:400;
`
const Bold = styled.span`
  font-weight:bold;
  font-size:120%;
  color:#111;
`

function SChart(props) {

  const [args] = useState(props);


  const arr = args["attributes"];
  const size = args["size"]-200;
  const colors = args["colors"];

  const rings = [...Array(10).keys()].map(i => (10-i));
  const angle = 2*Math.PI/arr.length;
    
  const map = (val, x1, x2, y1, y2) => y1+(val-x1)/(x2-x1)*(y2-y1);

  const half = Math.floor(arr.length/2);
  var extra = 0;
  if (arr.length%2 == 1) {
     extra = 1;
  }


  const leftTagsArray = [...Array(half).keys()].map(i => (i+half+extra));


  const generateRing = (ring) => {
    var incr = 100/arr.length;
    var stmnt = 'conic-gradient(';
    var percent = 0;
    var color = '';
    
    for (var i=0; i<arr.length-1; i++) {
      if (arr[i].value >= (ring*10)-5) {
          color=colors[i];
      } else {
        color='rgba(255,255,255,0)';
      }
      stmnt += color+' '+percent+'% '+(percent+incr)+'%, ';
      percent+=incr;
    };
    stmnt+=((arr[arr.length-1].value >= (ring*10)-5) ? colors[arr.length-1] : 'rgba(255,255,255,0)') + ' '+percent+'% ' + (percent+incr) +'%)';
    return stmnt;
  }


    return (
      <div style={{width:size+200, height:size+200, position:'relative'}}> 
         {rings.map(r => (
            <Ring style={{
                  width:r*(size/10),
                  height:r*(size/10),
                  background:generateRing(r)}}>
            </Ring>
        ))}

      {[...Array(arr.length).keys()].map(i => (
        <div>
          <Line style={{width:size/2, transform: 'rotate('+(angle*i-Math.PI/2)+'rad)'}}></Line>     
        </div>
      ))}

    {[...Array(half).keys()].map(i => (
        <TagsWrapper>
          <Tag style={{textAlign:"right", transform:'translate('+size*(map(arr[i].value,0,100,.45,.8))*Math.cos(angle*i-(Math.PI)/2-angle/2+angle)+'px,'+size*(map(arr[i].value,0,100,.45,.8))*Math.sin(angle*i-Math.PI/2-angle/2+angle)+'px)'}}>{arr[i].name}<br></br><Bold>{arr[i].value}%</Bold></Tag>
        </TagsWrapper>
      ))}

    {[...Array(extra).keys()].map(i => (
        <TagsWrapper>
          <Tag style={{textAlign: "center", transform:'translate('+size*(map(arr[(i+half)].value,0,100,.45,.8))*Math.cos(angle*(i+half)-(Math.PI)/2-angle/2+angle)+'px,'+size*(map(arr[(i+half)].value,0,100,.45,.8))*Math.sin(angle*(i+half)-Math.PI/2-angle/2+angle)+'px)'}}>{arr[(i+half)].name}<br></br><Bold>{arr[(i+half)].value}%</Bold></Tag>
        </TagsWrapper>
      ))}

    {leftTagsArray.map(i => (
        <TagsWrapper>
          <Tag style={{transform:'translate('+size*(map(arr[i].value,0,100,.45,.8))*Math.cos(angle*i-(Math.PI)/2-angle/2+angle)+'px,'+size*(map(arr[i].value,0,100,.45,.8))*Math.sin(angle*i-Math.PI/2-angle/2+angle)+'px)'}}>{arr[i].name}<br></br><Bold>{arr[i].value}%</Bold></Tag>
        </TagsWrapper>
      ))}

      </div>
      
    )
  }

SChart.defaultProps = {
  attributes: [],
  size: 400,
  colors: ['#FFE3C1','#D5BFD6','#F6D0CF','#BBE0F0','#C9E6E2', '#BEF2B8', '#ADADAD', '#FFCBA3', '#FFFA75', '#EEE']
}

SChart.propTypes = {
  attributes:
    PropTypes.arrayOf(PropTypes.shape({
      name:PropTypes.string,
      value:PropTypes.number  
    })).isRequired,
  size:
    PropTypes.number,
  colors:
    PropTypes.arrayOf(PropTypes.string)
}

function App() {

  const demoArrObjs = [
    {
      name: "Attribute 1",
      value: 50.6
    },
    {
      name: "Attribute 2",
      value: 76
    },
    {
      name: "Attribute 3",
      value: 89.8
    },
    {
      name: "Attribute 4",
      value: 22.6
    },
    {
      name: "Attribute 5",
      value: 50.4
    }
  ]

  const colors = ['#FFE3C1','#D5BFD6','#F6D0CF','#BBE0F0','#C9E6E2', '#BEF2B8', '#ADADAD', '#FFCBA3', '#FFFA75', '#EEE'];
  
  return (
    <div>
      <SChart attributes={demoArrObjs} size={400} colors={colors}/>
    </div>
  );
}

export default App;
