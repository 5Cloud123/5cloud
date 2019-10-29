const path = require('path');

const SRC_DIR = path.join(__dirname, '/src');
const DIST_DIR = path.join(__dirname, '/dist');

module.exports = {
  entry: path.resolve(__dirname, 'client', 'index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  mode: 'production',
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3dlYnBhY2suY29uZmlnLmpzIl0sIm5hbWVzIjpbInBhdGgiLCJyZXF1aXJlIiwiU1JDX0RJUiIsImpvaW4iLCJfX2Rpcm5hbWUiLCJESVNUX0RJUiIsIm1vZHVsZSIsImV4cG9ydHMiLCJlbnRyeSIsIm91dHB1dCIsImZpbGVuYW1lIiwibG9hZGVycyIsInRlc3QiLCJpbmNsdWRlIiwibG9hZGVyIiwicXVlcnkiLCJwcmVzZXRzIl0sIm1hcHBpbmdzIjoiQUFBQSxNQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxNQUFNQyxVQUFVRixLQUFLRyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsTUFBckIsQ0FBaEI7QUFDQSxNQUFNQyxXQUFXTCxLQUFLRyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsT0FBckIsQ0FBakI7O0FBRUFFLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsU0FBUSxHQUFFTixPQUFRLFVBREg7QUFFZk8sVUFBUTtBQUNOQyxjQUFVLFdBREo7QUFFTlYsVUFBTUs7QUFGQSxHQUZPO0FBTWZDLFVBQVE7QUFDTkssYUFBUyxDQUNQO0FBQ0VDLFlBQU0sUUFEUjtBQUVFQyxlQUFTWCxPQUZYO0FBR0VZLGNBQVEsY0FIVjtBQUlFQyxhQUFPO0FBQ0xDLGlCQUFTLENBQUMsT0FBRCxFQUFVLEtBQVY7QUFESjtBQUpULEtBRE87QUFESDtBQU5PLENBQWpCIiwiZmlsZSI6IndlYnBhY2suY29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxuY29uc3QgU1JDX0RJUiA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcvc3JjJyk7XG5jb25zdCBESVNUX0RJUiA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcvZGlzdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZW50cnk6IGAke1NSQ19ESVJ9L2FwcC5qc3hgLFxuICBvdXRwdXQ6IHtcbiAgICBmaWxlbmFtZTogJ2J1bmRsZS5qcycsXG4gICAgcGF0aDogRElTVF9ESVIsXG4gIH0sXG4gIG1vZHVsZToge1xuICAgIGxvYWRlcnM6IFtcbiAgICAgIHtcbiAgICAgICAgdGVzdDogL1xcLmpzeD8vLFxuICAgICAgICBpbmNsdWRlOiBTUkNfRElSLFxuICAgICAgICBsb2FkZXI6ICdiYWJlbC1sb2FkZXInLFxuICAgICAgICBxdWVyeToge1xuICAgICAgICAgIHByZXNldHM6IFsncmVhY3QnLCAnZW52J10sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG59O1xuIl19
