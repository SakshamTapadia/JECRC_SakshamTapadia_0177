import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private static instanceCount = 0;
  readonly instanceId: number;

  constructor() {
    LoggerService.instanceCount++;
    this.instanceId = LoggerService.instanceCount;
    console.log(`[LoggerService] Instance #${this.instanceId} created`);
  }

  log(message: string): void {
    console.log(`[Logger #${this.instanceId}] ${message}`);
  }

  warn(message: string): void {
    console.warn(`[Logger #${this.instanceId}] ${message}`);
  }

  error(message: string): void {
    console.error(`[Logger #${this.instanceId}] ${message}`);
  }
}
