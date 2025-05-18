export default class Vector3 {
	readonly x: number;
	readonly y: number;
	readonly z: number;

	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	static fromArray(args: number[]): Vector3 {
		return new Vector3(args[0], args[1], args[2]);
	}

	static fromObject(obj: { x: number; y: number; z: number }): Vector3 {
		return new Vector3(obj.x, obj.y, obj.z);
	}

	toString(floatPrecision = 2): string {
		return [this.x, this.y, this.z]
			.map((n) => n.toFixed(floatPrecision))
			.join(', ');
	}

	toArray(): number[] {
		return [this.x, this.y, this.z];
	}

	apply<T>(
		callback: (x: number, y: number, z: number) => T,
		context: object = null,
	): T {
		return callback.apply(context ?? this, this.toArray());
	}

	withX(value: number): Vector3 {
		return this.with('x', value);
	}

	withY(value: number): Vector3 {
		return this.with('y', value);
	}

	withZ(value: number): Vector3 {
		return this.with('z', value);
	}

	withOffsetX(offset: number): Vector3 {
		return this.withOffsets(offset, 0, 0);
	}

	withOffsetY(offset: number): Vector3 {
		return this.withOffsets(0, offset, 0);
	}

	withOffsetZ(offset: number): Vector3 {
		return this.withOffsets(0, 0, offset);
	}

	withOffsets(x: number | number[], y: number, z: number) {
		if (Array.isArray(x)) {
			this.withOffsets.apply(this, x);
		}

		return new Vector3(this.x + (x as number), this.y + y, this.z + z);
	}

	private with(key: string, value: number): Vector3 {
		const args = ['x', 'y', 'z'].map((k) =>
			key.toLowerCase() === k ? value : this[k as keyof this],
		);
		return Vector3.fromArray(args as number[]);
	}
}
