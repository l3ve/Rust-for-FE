// extern crate stopwatch;
// use stopwatch::Stopwatch;

fn main() {
    // let sw = Stopwatch::start_new();
    let mut nums = [0; 1000000];
    let mut n = 0;
    while n < 1000000 {
        nums[n] = n;
        n = n + 1;
    }
    // println!("Thing took {:?}", sw.elapsed());
}
