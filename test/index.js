import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Moment from 'moment';
import Should from 'should';
import JSDOM from 'jsdom';

import Timestamp from '../lib/timestamp';


global.document = JSDOM.jsdom("<!doctype html><html><body></body></html>");
global.window = document.defaultView;


describe('Timestamp', () => {
    
    it('renders a normal time ago', (done) => {
        let timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={Moment().subtract(3, 'days')} />
        );
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal("3 days ago");
        
        timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={Moment().subtract(3, 'months')} />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal("3 months ago");
        
        done();
    });
    
    describe('renders a normal time in local time', () => {
        it('in full', (done) => {
            let local = Moment();
            let utc = Moment().utc();
            
            let timestamp = TestUtils.renderIntoDocument(
                <Timestamp time={utc} format="full" />
            );
            
            Should(ReactDOM.findDOMNode(timestamp).textContent).equal(local.format('D MMM YYYY, h:mma'));
            
            timestamp = TestUtils.renderIntoDocument(
                <Timestamp time={utc.format('YYYY-MM-DD h:mm:ss')} format="full" />
            );
            
            Should(ReactDOM.findDOMNode(timestamp).textContent).equal(local.format('D MMM YYYY, h:mma'));
            
            done();
        });
        
        
        it('just the date', (done) => {
            let local = Moment();
            let utc = Moment().utc();
            
            let timestamp = TestUtils.renderIntoDocument(
                <Timestamp time={utc} format="date" />
            );
            
            Should(ReactDOM.findDOMNode(timestamp).textContent).equal(local.format('D MMM YYYY'));
            
            done();
        });
        
        
        it('just the time', (done) => {
            let local = Moment();
            let utc = Moment().utc();
            
            let timestamp = TestUtils.renderIntoDocument(
                <Timestamp time={utc} format="time" />
            );
            
            Should(ReactDOM.findDOMNode(timestamp).textContent).equal(local.format('h:mma'));
            
            done();
        });
    });
    
    
    it('renders an integer timestamp in local time', (done) => {
        let local = Moment();
        let utc = Moment().utc();
        
        let timestamp = TestUtils.renderIntoDocument(
            <Timestamp time={utc.unix()} format="full" />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal(local.format('D MMM YYYY, h:mma'));
        
        done();
    });
    
    
    it('renders "never" for a bad date', (done) => {
        let timestamp = TestUtils.renderIntoDocument(
            <Timestamp time="not a date or time" format="full" />
        );
        
        Should(ReactDOM.findDOMNode(timestamp).textContent).equal('never');
        
        done();
    });
    
});