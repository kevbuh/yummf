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
- comments
- pos neg review ratio
- normalize to 100
 */
}

// export const YumScore = (
//   // chef_following: number,
//   // chef_days_active: number,
//   taste_rating: number,
//   overall_rating: number,
//   quality_rating: number,
//   rating_length: number,
//   num_saves: number,
//   num_views: number
// ) => {
//   const score =
//     // 0.05 * chef_following *
//     // (0.05 * chef_days_active) *
//     (0.8 *
//       taste_rating *
//       (0.8 * overall_rating) *
//       (0.3 * quality_rating) *
//       (0.9 * rating_length) *
//       100000000 +
//       (0.8 * num_saves + 0.3 * (num_views + 1))) /
//     100000000;
//   return String(Math.abs(score + 60)).slice(0, 2);
// };

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
  if (
    taste_rating == 0 ||
    overall_rating == 0 ||
    quality_rating == 0 ||
    rating_length == 0 ||
    num_saves == 0 ||
    num_views == 0
  ) {
    return 60;
  }

  const defaultVal = 60;

  const ratingVal = quality_rating;

  //     1 +
  //     (4 * overall_rating) / (rating_length + 1) +
  //     1 +
  //     (5 * taste_rating) / (rating_length + 1) +
  //     1) +

  const viewSavesVal = (num_saves * 7) / num_views;

  const score = defaultVal + ratingVal + viewSavesVal;

  return String(Math.abs(score)).slice(0, 2);
};
