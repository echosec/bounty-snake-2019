var arr = [
  [1, 1, 0, 1, 0],
  [1, 1, 0, 1, 0],
  [0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 1, 1, 1]
];
const visited = new Set;

function findWalkable(arr) {
  const walkable = [];

  // Iterate over the rows and columns
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      // If the node is in the set, continue
      if (visited.has(`${i},${j}`)) {
        continue;
      }

      // If not, kick off a traversal and get
      // the area
      const area = traverse(i, j);

      if (area) {
        walkable.push(area);
      }
    }
  }

  return walkable;
}

function traverse(x: number, y: number, current = []) {
  // If we're going off the board, return
  if (x < 0 || y < 0 || x > arr.length - 1 || y > arr[0].length - 1) {
    return;
  }

  // If we've already looked at this node,
  // or it is unwalkable, return
  if (arr[x][y] !== 0 || visited.has(`${x},${y}`)) {
    return;
  }

  // If the space is walkable, add it to the current array and
  // the visited set, then recursively traverse each neighbouring node
  current.push(`${x},${y}`);
  visited.add(`${x},${y}`)
  traverse(x, y + 1, current);
  traverse(x, y - 1, current);
  traverse(x - 1, y, current);
  traverse(x + 1, y, current);

  // Return the array
  return current;
}

function findAdjacent() {

}