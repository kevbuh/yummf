type YumScoreProps = {
  chef_following: number;
  chef_days_active: number;
  taste_rating: number;
  overall_rating: number;
  quality_rating: number;
  rating_length: number;
  num_saves: number;
  num_views: number;
};

{
  /*
YUM SCORE:
Needs to maxed at 100
Ratings above 4.5 need to be more valuable than ones around 4

still need to include:
- number comments
- pos neg review ratio
- plus/minus points for tags
 */
}
const getBaseLog = (x: number, y: number) => {
  return Math.log(y) / Math.log(x);
};

export const YumScore = (
  // chef_following: number,
  // chef_days_active: number,
  taste_rating: number,
  overall_rating: number,
  quality_rating: number,
  rating_length: number,
  num_saves: number,
  num_views: number
) => {
  if (rating_length == 0 || rating_length == undefined) {
    return 60;
  }

  const defaultVal = 60;
  let ratingScore = 0;

  if (rating_length == 0) {
    ratingScore = 60;
  } else if (
    overall_rating / rating_length >= 4.7 &&
    overall_rating / rating_length <= 5 &&
    rating_length > 6
  ) {
    ratingScore = 80 * defaultVal + overall_rating / (0.3 * rating_length);
  } else if (overall_rating / rating_length >= 4.5) {
    ratingScore = 4 * defaultVal + overall_rating / rating_length;
  } else if (
    overall_rating / rating_length >= 4 &&
    overall_rating / rating_length < 4.5
  ) {
    ratingScore = defaultVal + overall_rating / rating_length;
  } else if (
    overall_rating / rating_length >= 3.5 &&
    overall_rating / rating_length < 4
  ) {
    ratingScore = 0.3 * defaultVal + overall_rating / rating_length;
  } else if (
    overall_rating / rating_length >= 3 &&
    overall_rating / rating_length < 3.5
  ) {
    ratingScore = 0.2 * defaultVal + overall_rating / rating_length;
  } else {
    ratingScore = 0.1 * defaultVal + overall_rating / rating_length;
  }

  let score = 0;

  if (overall_rating / rating_length <= 3) {
    score = 0.075 * getBaseLog(Math.exp(1), ratingScore);
  } else {
    score = 0.5 * getBaseLog(Math.exp(1), ratingScore);
  }

  if (overall_rating / rating_length <= 3) {
    score -= 0.3 * getBaseLog(Math.exp(1), num_views + 1);
    score -= 0.85 * getBaseLog(Math.exp(1), num_saves + 1);
  } else {
    score += 0.3 * getBaseLog(Math.exp(1), num_views + 1);
    score += 0.15 * getBaseLog(Math.exp(1), num_saves + 1);
  }

  const total = 100 / (1 + Math.exp(-(score - 0.2)));

  return String(Math.min(total, 99)).slice(0, 2);
};
