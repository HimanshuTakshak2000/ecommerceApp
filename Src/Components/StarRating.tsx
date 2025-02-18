import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Path} from 'react-native-svg';

interface StarProps {
  fillPercentage: number;
  starSize: number;
}

interface StarRatingProps {
  rating: number;
  starSize?: number;
}

const Star: React.FC<StarProps> = ({fillPercentage, starSize}) => {
  return (
    <View style={[styles.starContainer, {width: starSize, height: starSize}]}>
      <Svg height={starSize} width={starSize} viewBox="0 0 24 24">
        <Path
          d="M12 .587l3.668 7.429L24 9.753l-6 5.853L19.335 24 12 19.951 4.665 24 6 15.606l-6-5.853 8.332-1.737z"
          fill={'#E5E5E5'}
        />
      </Svg>
      <View style={[styles.filledStarContainer, {width: `${fillPercentage}%`}]}>
        <Svg height={starSize} width={starSize} viewBox="0 0 24 24">
          <Path
            d="M12 .587l3.668 7.429L24 9.753l-6 5.853L19.335 24 12 19.951 4.665 24 6 15.606l-6-5.853 8.332-1.737z"
            fill={'#FDD835'}
          />
        </Svg>
      </View>
    </View>
  );
};

const StarRating: React.FC<StarRatingProps> = ({rating, starSize = 30}) => {
  const renderStar = (index: number) => {
    const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;
    return (
      <Star key={index} fillPercentage={fillPercentage} starSize={starSize} />
    );
  };

  return (
    <View style={styles.starRatingContainer}>
      {[...Array(5)].map((_, index) => renderStar(index))}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    position: 'relative',
  },
  filledStarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  starRatingContainer: {
    flexDirection: 'row',
  },
});

export default StarRating;
